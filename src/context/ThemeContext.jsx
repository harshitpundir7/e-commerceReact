import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState("light");

    function changeTheme() {
        setMode((prevMode)=> (prevMode==="light"? "dark" : "light"))
    }


    return (
        <ThemeContext.Provider value={{ mode, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
