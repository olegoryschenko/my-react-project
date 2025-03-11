import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../main";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { addDoc, collection, query, orderBy, serverTimestamp } from "firebase/firestore";

export const Chat = ({ darkMode, modalFriends, setModalFriends, widthPage }) => {
    const [value, setValue] = useState('');
    const btnScrollMessagesRef = useRef(null);
    const messageContainerRef = useRef(null);
    const [btnScrollMessagesShow, setBtnScrollMessagesShow] = useState(null)

    const {auth, firestore} = useContext(AuthContext)
    const [user] = useAuthState(auth);
    const [messages, loading] = useCollectionData(
        query(collection(firestore, 'messages'), orderBy('createdAt'))
      );
    
    const handleInputChange = (e) => {
            setValue(e.target.value)
    }

    const sendMessage = async () => {
        if(value.trim() === '') { return }

        try {
            const messageCollection = collection(firestore, "messages");

            await addDoc(messageCollection, {
                userId: user?.uid,
                name: user?.displayName,
                photoUrl: user?.photoURL,
                text: value,
                createdAt: serverTimestamp(),


            })
        } catch (error) {
            console.error("Error sending message: ", error);
        }

        setValue('')
    }

    const handleScrollSendMessages = () => {
        if (messageContainerRef.current) {
          const scrollPosition = messageContainerRef.current.scrollTop;
          const scrollThreshold = 100;
    
          if (scrollPosition > scrollThreshold) {
            setBtnScrollMessagesShow(true)
          } else {
            setBtnScrollMessagesShow(false)
          }
        }
    };

    const handleScrollMessages = () => {
            if(messageContainerRef.current) {
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
            }
    }

    const handleModalFriends = () => {
        setModalFriends(!modalFriends)
    }

    useEffect(() => {
        if(messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
        }
    },[messages])

 
    useEffect(() => {
        const container = messageContainerRef.current;
        if (container) {
          container.addEventListener('scroll', handleScrollSendMessages);
        }
    
        return () => {
          if (container) {
            container.removeEventListener('scroll', handleScrollSendMessages);
          }
        };
      }, []);


    return (
        <div style={{
            filter: modalFriends && widthPage < 821 ? 'blur(50px)' : null  
        }} className="chat">
            <header
             style={{
                borderBottom: darkMode ? '1px solid #272A30' : null,
             }} 
              className="chat__header">
                <div className="chat__header-inner">
                    {!loading ?
                        <>
                        <div className="chat__header-inner-img-block">
                        <span className="text-avatar">{'Чат'.slice(0, 1)}</span> 
                        </div>
                            <div
                             
                             className="chat__header-inner-information">
                                <h3
                                 style={{
                                    color: darkMode ? '#fff' : null
                                 }} 
                                 className="chat__header-inner-information--title">Чат</h3>
                                <span 
                                 style={{
                                    color: darkMode ? '#747881' : null
                                 }} 
                                className="chat__header-inner-information--status">Online for 10 mins</span>
                            </div>
                        
                        </>
                    :
                    <div className="loader-header-chat"></div>
                }
                </div>
            </header>
            <main className="chat__main" ref={messageContainerRef}>
                {!loading ? 
                        messages.map((messages) => (
                        <div key={messages.createdAt} className={messages.userId !== user.uid ? "chat__main-message--block user animate__animated animate__fadeInUp" : "chat__main-message--block you animate__animated animate__fadeInUp"}>
                            <div className="chat__main-message--block__inner">
                                    <div className="chat__header-inner-img-block">
                                        <span className="text-avatar">{messages.name.slice(0, 1)}</span> 
                                        </div>
                                        <div className="chat__main-message--block-message-info-block">
                                                <p
                                                    style={{
                                                        color: darkMode ? '#fff' : null,
                                                        background: darkMode && messages.userId !== user.uid  ? '#1C1E22' : darkMode && messages.userId === user.uid ? '#001A3D' : null
                                              
                                                    }}
                                                    className={messages.userId !== user.uid ? "chat__main-message--block-text user" : "chat__main-message--block-text you"}>
                                                {messages.text}
                                                </p>
                                        </div>   
                            </div>
                      </div>
                        ))
                        :
                        <div className="loader-main-chat"></div>
                        }
            </main>
            <footer 
            style={{
                background: darkMode ? '#000' : '#ededed'
            }}
             className="chat__footer">
                <button
                onClick={handleModalFriends}
                 className="chat__footer-add--img">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <g clipPath="url(#clip0_23338_4596)">
                         <path d="M17.3332 9.33332L14.6666 9.33332L14.6666 14.6666L9.33324 14.6666L9.33324 17.3333L14.6666 17.3333L14.6666 22.6667L17.3332 22.6667L17.3332 17.3333L22.6666 17.3333L22.6666 14.6666L17.3332 14.6666L17.3332 9.33332ZM15.9999 2.66665C8.63991 2.66665 2.66658 8.63998 2.66658 16C2.66658 23.36 8.63991 29.3333 15.9999 29.3333C23.3599 29.3333 29.3332 23.36 29.3332 16C29.3332 8.63998 23.3599 2.66665 15.9999 2.66665ZM15.9999 26.6667C10.1199 26.6666 5.33324 21.88 5.33325 16C5.33324 10.12 10.1199 5.33332 15.9999 5.33332C21.8799 5.33332 26.6666 10.12 26.6666 16C26.6666 21.88 21.8799 26.6666 15.9999 26.6667Z" fill="#747881" />
  </g>
  <defs>
    <clipPath id="clip0_23338_4596">
      <rect width="32" height="32" fill="white" />
    </clipPath>
  </defs>
                    </svg>
                </button>
                    <input
                    style={{
                        outline: darkMode ? '1px solid #272A30' : null,
                        color: darkMode ? '#fff' : null
                    }}
                     type="text" 
                     placeholder="Type your message"
                     value={value === '' ? '' : value}
                     onChange={handleInputChange}
                     />
                    <button 
                        style={{
                            background: darkMode ? '#4C525C' : null
                        }}
                         className={value.trim() === '' ? "chat__footer-send__message-btn" : "chat__footer-send__message-btn active"}
                         onClick={sendMessage}
                         disabled={value.trim()  === '' ? true : false }
                    >
                         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M0.0095238 20L20 10L0.0095238 0L0 7.77778L14.2857 10L0 12.2222L0.0095238 20Z" fill="#fff" />
                        </svg>
                    </button>
            </footer>
            {!btnScrollMessagesShow ?
                <div className="scroll-down" onClick={handleScrollMessages}  ref={btnScrollMessagesRef}></div>
                :
                null
            }
        </div>
    )
}