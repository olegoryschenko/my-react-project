import { useContext } from "react"
import { AuthContext } from "../main"
import { signInWithPopup,  GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, } from "firebase/firestore";


export const Login = () => {
    const { auth, firestore } = useContext(AuthContext);
   

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        try {
                  const usersCollection = collection(firestore, "users");
      
                  await addDoc(usersCollection, {
                      userId: user?.uid,
                      name: user?.displayName,
                      photoUrl: user?.photoURL,
                  })
              } catch (error) {
                  console.error("Error sending message: ", error);
              }
    }

    return (
        <div id="login">
             <h1 className="login__title"><strong>Welcome in chat.</strong> Please login before start.</h1>
            <p>
                <button className="google" onClick={login}>Login Using Google</button>
            </p>
        </div>
    )
}