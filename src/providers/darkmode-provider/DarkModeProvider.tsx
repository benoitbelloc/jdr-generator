import React from "react"

export const DarkModeContext = React.createContext<any>([]);

export default function DarkModeProvider ({children}: {children: React.ReactNode}){
    const [darkMode, setDarkMode] = React.useState<boolean>(false);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('dark', newMode.toString());
    }

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}