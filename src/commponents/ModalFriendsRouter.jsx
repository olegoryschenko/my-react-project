import { createContext, useEffect, useState } from "react"
export const ContextModalFriends = createContext();

export const ModalFriendsRouter = ({ children }) => {
    const [modalFriends, setModalFriends] = useState(() => {
        return localStorage.getItem('modalFriends') === "true"
    })

    useEffect(() => {
        localStorage.setItem('modalFriends', modalFriends)
      }, [modalFriends])
    
    return(
        <ContextModalFriends.Provider value={{
            modalFriends,
            setModalFriends
        }}>
            {children}
        </ContextModalFriends.Provider>
    )
}