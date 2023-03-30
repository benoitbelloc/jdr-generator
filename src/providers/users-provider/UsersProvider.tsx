import React from "react"
import { useNavigate } from "react-router-dom";
import { User } from "../../views/main-content/MainContent";

export const UsersContext = React.createContext<any>([]);

function UsersProvider ({children}: {children: React.ReactNode}){
    const navigate = useNavigate();
    const [users, setUsers] = React.useState<User[]>([]);
    const [user, setUser] = React.useState<User | null>(null);

    const login = (username: string) => {
        fetch(`http://localhost:3000/users?username=${username}`)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            if (data.length === 1) {
                setUser(data[0])
            } else if (data.length === 0) {
                const response = fetch(`http://localhost:3000/users?username=${username}`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({username})
                })
                return response
            } else { // cas où on en a plus de 1
                alert("Une erreur est survenue")
            }
        })
        .then(() => navigate("/home"))
        .catch((error)=>{
            console.log(error);
        })
    }

    const getUser = (id: string) => {
        fetch(`http://localhost:3000/users/}`).then((response)=>{
            return response.json()
        }).then((data)=>{
            setUser(data)
        }).catch((error)=>{
            console.log(error);
        })
    }

    const getAllCharactersByUserId = (userId: string, characterId: string) => {
        fetch(`http://localhost:3000/${userId}/${characterId}`).then((response)=>{
            return response.json()
        })
    }

    return (
        <UsersContext.Provider value={{ login, user, getUser, getAllCharactersByUserId }}>
            {children}
        </UsersContext.Provider>
    )
}


export default UsersProvider