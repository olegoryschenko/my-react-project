import { useEffect, useState, useContext} from "react"
import { AuthContext } from "../src/main";
import { useAuthState } from 'react-firebase-hooks/auth';
import { ContextDark } from "../src/commponents/ChangeDarkRouter";


export const ProfileMenu = ({ active }) => {
    const [activeClass, setActiveClass] = useState(false);
    const { auth } = useContext(AuthContext);
    const { darkMode, setDarkMode } = useContext(ContextDark);
    const [ user ] = useAuthState(auth)
    useEffect(() => {
            setTimeout(() => {
                setActiveClass(true)
            }, 100);
    }, [activeClass])

    const handleDarkModeChange = (e) => {
        if(e.target.checked) {   
            setDarkMode(true)
        } else { setDarkMode(false) }
    }

     return (
        <div className={activeClass ? active : 'menu'}>
            <ul className="menu__lists">
                <li
                style={{
                    background: darkMode ? '#000' : null,
                    border: 'none'
                }}
                 className="menu__lists-item">
                    <div className="menu__lists-item-profile">
                        <div className="chat__header-inner-img-block you">
                        <span className="text-avatar">{user.displayName.slice(0, 1)}</span> 
                        </div>
                        <div className="chat__header-inner-information">
                            <h3 className="chat__header-inner-information--title">{user.displayName}</h3>
                            <span className="chat__header-inner-information--status">{user.email}</span>
                        </div>
                    </div>
                </li>
                <li
                style={{
                    background: darkMode ? '#000' : null,
                    border: 'none'
                }}
                 className="menu__lists-item" >
                            <div className="checkbox-wrapper-6">
                            <p>Dark setting</p>
                                <input 
                                className="tgl tgl-light" 
                                id="cb1-6" 
                                type="checkbox" 
                                checked={darkMode}
                                onChange={handleDarkModeChange}
                                />
                                <label className="tgl-btn" for="cb1-6"/>
                            </div>
                </li>
                <li 
                style={{
                    background: darkMode ? '#000' : null,
                    border: 'none'
                }}
                className="menu__lists-item">
                       <button className="menu__lists-item-logout--btn" onClick={() => auth.signOut()}>LOGOUT</button>
                </li>
            </ul>
        </div>
    )
}