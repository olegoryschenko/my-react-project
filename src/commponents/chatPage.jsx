import { Friends } from "./friend"
import { Chat } from "./chat"
import { useContext, useEffect, useRef, useState } from "react"
import { ContextDark } from "./ChangeDarkRouter"
import { ContextModalFriends, } from "./ModalFriendsRouter"

export const ChatPage = () => {
  const { darkMode } = useContext(ContextDark)
  const { modalFriends, setModalFriends } = useContext(ContextModalFriends)
  const [widthPage, setWidthPage] = useState(1920)

  useEffect(() => {
    const handleWidth = (e) => {
      setWidthPage(e.target.innerWidth)
    }

    window.addEventListener('resize', handleWidth);

    return () => {
      window.removeEventListener('resize', handleWidth)
    }
  }, [])
  
    return (
          <div
          className={darkMode ? "chat__block dark" : "chat__block"}>
          <Friends darkMode={darkMode} modalFriends={modalFriends} setModalFriends={setModalFriends}/>
          <Chat  darkMode={darkMode} modalFriends={modalFriends} setModalFriends={setModalFriends} widthPage={widthPage} />        
        </div>
    )
}