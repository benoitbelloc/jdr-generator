import React from "react"
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../interfaces/constants";
import { User } from "../../interfaces/Types";

export const UsersContext = React.createContext<any>([]);

export default function UsersProvider ({children}: {children: React.ReactNode}){
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User | null>(null);

    const login = async (username: string) => {
        try {
            const response = await fetch(`${SERVER_URL}users?username=${username}`)
            const data = await response.json();
            let idForLocal = {};
            if (data.length > 1) {
                alert('There is more than one user with this name')
            } else if (data.length === 1) {
                setUser(data[0]);
                idForLocal = data[0].username;
            } else if (data.length === 0) {
                await fetch(`${SERVER_URL}users?username=${username}`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({username})
                })
                const responseAfterCreate = await fetch(`${SERVER_URL}users?username=${username}`)
                const dataAfterCreate = await responseAfterCreate.json();
                setUser(dataAfterCreate[0]);
                idForLocal = dataAfterCreate[0].username;
                console.log("before local");
            }
            localStorage.setItem('user', idForLocal.toString());
            navigate('/home');
        } catch (error) {
            console.log(error);
            
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    }

    const getUser = async (username: string) => {
        try {
            const response = await fetch(`${SERVER_URL}users?username=${username}`)
            const data = await response.json()            
            setUser(data[0])
        } catch (error) {
            console.log(error);
        }
    }

    const getUserFromLocalStorage = () => {
        const userNameFromLocalStorage = localStorage.getItem('user');        
        if (userNameFromLocalStorage) {
            getUser(userNameFromLocalStorage);            
        }
    }

    return (
        <UsersContext.Provider value={{ login, logout, user, getUser, getUserFromLocalStorage }}>
            {children}
        </UsersContext.Provider>
    )
}