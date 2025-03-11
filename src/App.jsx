import { useContext } from "react"
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from "./commponents/AppRouter"
import { useAuthState } from "react-firebase-hooks/auth"
import { AuthContext } from "./main"
import './css/main.css'
import { Loader } from "./commponents/Loader"
import { ChangeDarkRouter } from "./commponents/ChangeDarkRouter"
import { ModalFriendsRouter } from "./commponents/ModalFriendsRouter"


function App() {
  const { auth } = useContext(AuthContext);
  const [ user, loading, error ] = useAuthState(auth);


  if(loading) {
    return <Loader/>
  }

  return (
    <>
    <BrowserRouter>
    <ChangeDarkRouter>
      <ModalFriendsRouter>
        <AppRouter/>
      </ModalFriendsRouter>
    </ChangeDarkRouter>
    </BrowserRouter>
    </>
  )
}

export default App
