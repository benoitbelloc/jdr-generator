import React from "react";
import { useLocation } from "react-router-dom";
import { Character } from "../../views/main-content/MainContent";

export const CharactersContext = React.createContext<any>([]);

function CharactersProvider({children}: {children: React.ReactNode}) {
    const [characters, setCharacters] = React.useState<Character[]>([]);
    const [character, setCharacter] = React.useState<Character | null>(null);

    const getAllCharacters = () => {        
        fetch('http://localhost:3000/characters').then((response) => {
            return response.json()
        }).then((data) => {            
            setCharacters(data)
        }).catch((error) => {
            console.log(error);
        })
    }

    const getOneCharacter = (id: string) => {
        fetch(`http://localhost:3000/characters/${id}`).then((response) => {
            return response.json()
        }).then((data) => {
            setCharacter(data)
        }).catch((error) => {
            console.log(error);
        })
    }
    
    return (
        <CharactersContext.Provider value={{ characters, character, getAllCharacters, getOneCharacter }}>
            {children}
        </CharactersContext.Provider>
    )
}

export default CharactersProvider