import {  createContext, useState, useEffect } from "react"

export const ContextDark = createContext();


export const ChangeDarkRouter = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true"  ;
    })

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
      }, [ darkMode ]);


    return(
        <ContextDark.Provider value={{
            darkMode,
            setDarkMode
        }}>
            {children}
        </ContextDark.Provider>
    )
}