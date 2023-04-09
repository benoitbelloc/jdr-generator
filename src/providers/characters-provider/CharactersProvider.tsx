import React from "react";
import { UsersContext } from "../users-provider/UsersProvider";
import { useNavigate } from "react-router-dom";
import { Character } from "../../types/Types";

const baseCharacter: Character = {
    infos: {
        avatar: 'https://as1.ftcdn.net/jpg/03/91/19/22/220_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg',
        name: 'Name',
        type: 'Type',
        class: 'Class',
    },
    stats: {
        level: 0,
        hp: 0,
        mp: 0,
        atk: 0,
        def: 0,
    },
    talents: {
        physical: 0,
        intellect: 0,
        dexterity: 0,
        charism: 0,
    },
    weapons: [],
    description: ''
}

export const CharactersContext = React.createContext<any>([]);

export default function CharactersProvider ({children}: {children: React.ReactNode}) {
    const [characters, setCharacters] = React.useState<Character[]>([]);
    const [character, setCharacter] = React.useState<Character | null>(null);
    const {user} = React.useContext(UsersContext)  
    const navigate = useNavigate();

    // const getAllCharacters = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3000/characters')
    //         const data: Character[] = await response.json()
    //         setCharacters(data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const updateOneCharacter = async (characterData: Character) => {
        try {
            await fetch(`http://localhost:3000/characters/${characterData.id}`, 
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(characterData)
            })
            setCharacter(characterData)
            getCharactersByUserId();
        } catch (error) {
            console.log(error);
        }
    }

    const removeCharacter = async (id: string) => {
        try {
            await fetch(`http://localhost:3000/characters/${id}`, 
            {
                method: "DELETE",
            })
            setCharacter(null)
            getCharactersByUserId();
            navigate('/home')
        } catch (error) {
            console.log(error);
        }
    }

    const getOneCharacter = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/characters/${id}`)
            const data = await response.json()
            setCharacter(data)
        } catch (error) {
            console.log(error);
        }
    }

    const createOneCharacter = async () => {
        if (!user.id) return alert('You must be logged in to create a character');
        baseCharacter.userId = user.id;
        try {
            await fetch(`http://localhost:3000/characters`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(baseCharacter)
            })
            setCharacter(null)
            getCharactersByUserId();
            navigate('/home')
        } catch (error) {
            console.log(error);
        }
    }

    const getCharactersByUserId = async () => {
        try {
            const response = await fetch(`http://localhost:3000/characters?userId=${user.id}`)
            const data = await response.json()
            setCharacters(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CharactersContext.Provider value={{ characters, character, setCharacter, getOneCharacter, updateOneCharacter, createOneCharacter, removeCharacter, getCharactersByUserId }}>
            {children}
        </CharactersContext.Provider>
    )
}