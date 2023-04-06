import React from "react";
import { Character } from "../../views/main-content/MainContent";

const baseCharacter = {
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

function CharactersProvider ({children}: {children: React.ReactNode}) {
    const [characters, setCharacters] = React.useState<Character[]>([]);
    const [character, setCharacter] = React.useState<Character>(baseCharacter);

    const getAllCharacters = async () => {
        try {
            const response = await fetch('http://localhost:3000/characters')
            const data: Character[] = await response.json()
            setCharacters(data)
        } catch (error) {
            console.log(error);
        }
    }

    const updateOneCharacter = async (characterData: Character) => {
        console.log(characterData.id);
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
            setCharacter(baseCharacter)
            getAllCharacters();
        } catch (error) {
            console.log(error);
        }
    }

    const getOneCharacter = async (id: string) => {
        if (!id) return setCharacter(baseCharacter);
        try {
            const response = await fetch(`http://localhost:3000/characters/${id}`)
            const data = await response.json()
            setCharacter(data)
        } catch (error) {
            console.log(error);
        }
    }

    const createOneCharacter = async () => {
        try {
            await fetch(`http://localhost:3000/characters`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(baseCharacter)
            })
            setCharacter(baseCharacter)
            getAllCharacters();
        } catch (error) {
            console.log(error);
        }
    }

    const getCharactersByUserId = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/characters?userId=${userId}`)
            const data = await response.json()
            setCharacters(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CharactersContext.Provider value={{ characters, character, getAllCharacters, getOneCharacter, updateOneCharacter, createOneCharacter, removeCharacter, getCharactersByUserId }}>
            {children}
        </CharactersContext.Provider>
    )
}

export default CharactersProvider