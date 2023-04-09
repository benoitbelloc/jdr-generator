import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Character, User } from "../../views/main-content/MainContent";

export const UsersContext = React.createContext<any>([]);

function UsersProvider ({children}: {children: React.ReactNode}){
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User | null>(null);

    const login = async (username: string) => {
        try {
            const response = await fetch(`http://localhost:3000/users?username=${username}`)
            const data = await response.json();
            if (data.length > 1) {
                alert('There is more than one user with this name')
            } else if (data.length === 1) {
                setUser(data[0]);
            } else if (data.length === 0) {
                await fetch(`http://localhost:3000/users?username=${username}`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({username})
                })
                const responseAfterCreate = await fetch(`http://localhost:3000/users?username=${username}`)
                const dataAfterCreate = await responseAfterCreate.json();
                setUser(dataAfterCreate[0]);
            }
            navigate('/home');
        } catch (error) {
            console.log(error);
            
        }
    }

    const logout = () => {
        setUser(null);
        navigate('/');
    }

    const getUser = async (username: string) => {
        try {
            const response = await fetch(`http://localhost:3000/users?username=${username}}`)
            const data = await response.json()
            setUser(data)
        } catch (error) {
            console.log(error);
        }
    }

    const getCharacterByUserId = async (characterId: string) => {
        try {
            const reponse = await fetch(`http://localhost:3000/users/users?charactersId=${characterId}`)
            const data = await reponse.json()
            setUser(data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UsersContext.Provider value={{ login, logout, user, getUser, getCharacterByUserId }}>
            {children}
        </UsersContext.Provider>
    )
}


export default UsersProvider