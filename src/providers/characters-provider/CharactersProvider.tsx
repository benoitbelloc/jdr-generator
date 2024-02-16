import React from "react";
import { UsersContext } from "../users-provider/UsersProvider";
import { useNavigate } from "react-router-dom";
import { Character, Class } from "../../interfaces/Types";
import { SERVER_URL, classesList } from "../../interfaces/constants";

const baseCharacter: Character = {
    infos: {
        avatar: 'https://www.dsppublications.com/assets/common/images/author_placeholder.png',
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

const descriptionPhrases = {
    adjectives: [
        "honnête",
        "sympathique",
        "intelligent",
        "charismatique",
        "malin",
        "sage",
        "sérieux",
        "malveillant",
        "vénal",
        "vulgaire",
        "égocentrique",
    ],
    likes: [
        "la cuisine de sa mère",
        "les promenades entre amis",
        "les jeux de société",
        "nager dans le lac près de chez lui",
        "chanter au clair de lune",
    ],
    dislikes: [
        "les gens qui ne respectent pas les règles",
        "les animaux sauvages",
        "les sandwiches au fromage",
        "les chats (il est allergique)",
        "courir",
    ],
    family: [
        "Il a un frère et une sœur.",
        "Il a été élevé par sa mère.",
        "Il a été élevé par son père.",
        "Il a été élevé par ses grands-parents.",
        "Il n'a jamais connu ses parents.",
        "Il est orphelin.",
    ],
    objective: [
        "Il veut devenir un héros.",
        "Il aimerait construire une maison.",
        "Il veut devenir riche.",
        "Il veut devenir un grand chef.",
        "Il rêve de fonder une famille.",
        "Il en est certain, un jour il sera célèbre.",
    ],
}

export const types = ['Humain', 'Nain', 'Elfe', 'Orque', 'Fée', 'Gobelin', 'Gnome']

export const CharactersContext = React.createContext<any>([]);

export default function CharactersProvider ({children}: {children: React.ReactNode}) {
    const [characters, setCharacters] = React.useState<Character[]>([]);
    const [character, setCharacter] = React.useState<Character | null>(null);
    const [selectedClass, setSelectedClass] = React.useState<Class | null>(null);
    const {user} = React.useContext(UsersContext)  
    const navigate = useNavigate();
    const classes: Class[] = classesList;

    const getOneClass = async (name: string) => {
        try {
            const oneClass = classes.find((c: Class) => c.name === name) || null;      
            setSelectedClass(oneClass)
        } catch (error) {
            console.log(error);
        }
    }

    const updateOneCharacter = async (characterData: Character) => {
        try {
            await fetch(`${SERVER_URL}characters/${characterData.id}`, 
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(characterData)
            })            
            setCharacter(characterData)
            getCharactersByUserId();
            getOneClass(characterData.infos.class)
        } catch (error) {
            console.log(error);
        }
    }

    const removeCharacter = async (id: string) => {
        try {
            await fetch(`${SERVER_URL}characters/${id}`, 
            {
                method: "DELETE",
            })
            setCharacter(null)
            setSelectedClass(null)
            getCharactersByUserId();
            navigate('/home')
        } catch (error) {
            console.log(error);
        }
    }

    const getOneCharacter = async (id: string) => {
        try {
            const response = await fetch(`${SERVER_URL}characters/${id}`)
            const data = await response.json()
            setCharacter(data)                        
            getOneClass(data.infos.class)
        } catch (error) {
            console.log(error);
        }
    }

    const createOneCharacter = async () => {
        if (!user.id) return alert('You must be logged in to create a character');
        baseCharacter.userId = user.id;
        try {
            await fetch(`${SERVER_URL}characters`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(baseCharacter)
            })
            setCharacter(null)
            setSelectedClass(null)
            getCharactersByUserId();
            navigate('/home')
        } catch (error) {
            console.log(error);
        }
    }

    const getCharactersByUserId = async () => {
        try {
            const response = await fetch(`${SERVER_URL}characters?userId=${user.id}`)
            const data = await response.json()
            setCharacters(data)
        } catch (error) {
            console.log(error)
        }
    }

    const createRandomisedCharacter = async () => {
        if (!user.id) return alert('You must be logged in to create a character');
        if (!character) return alert('You must have a character to randomise');
        try {
            const response = await fetch('https://random-data-api.com/api/v2/users')
            const data = await response.json();
            const name = data.first_name;
            const randomClass = classesList[Math.floor(Math.random() * classesList.length)]
            
            const newCharacter: Character = {
                id: character.id,
                userId: character.userId,
                infos: {
                    avatar: randomClass.url,
                    name: name,
                    type: types[Math.floor(Math.random() * types.length)],
                    class: randomClass.name,
                },
                stats: {
                    level: 1,
                    hp: Math.floor(Math.random() * (Math.floor(randomClass.stats.hp.max) - Math.ceil(randomClass.stats.hp.min)) + Math.ceil(randomClass.stats.hp.min)),
                    mp: Math.floor(Math.random() * (Math.floor(randomClass.stats.mp.max) - Math.ceil(randomClass.stats.mp.min)) + Math.ceil(randomClass.stats.mp.min)),
                    atk: Math.floor(Math.random() * (Math.floor(randomClass.stats.atk.max) - Math.ceil(randomClass.stats.atk.min)) + Math.ceil(randomClass.stats.atk.min)),
                    def: Math.floor(Math.random() * (Math.floor(randomClass.stats.def.max) - Math.ceil(randomClass.stats.def.min)) + Math.ceil(randomClass.stats.def.min)),
                },
                talents: {
                    physical: Math.floor(Math.random() * (Math.floor(randomClass.talents.physical.max) - Math.ceil(randomClass.talents.physical.min)) + Math.ceil(randomClass.talents.physical.min)),
                    intellect: Math.floor(Math.random() * (Math.floor(randomClass.talents.intellect.max) - Math.ceil(randomClass.talents.intellect.min)) + Math.ceil(randomClass.talents.intellect.min)),
                    dexterity: Math.floor(Math.random() * (Math.floor(randomClass.talents.dexterity.max) - Math.ceil(randomClass.talents.dexterity.min)) + Math.ceil(randomClass.talents.dexterity.min)),
                    charism: Math.floor(Math.random() * (Math.floor(randomClass.talents.charism.max) - Math.ceil(randomClass.talents.charism.min)) + Math.ceil(randomClass.talents.charism.min)),
                },
                weapons: [
                    randomClass.weapons[Math.floor(Math.random() * randomClass.weapons.length)],
                    randomClass.weapons[Math.floor(Math.random() * randomClass.weapons.length)],
                ],
            }
            const baseDesc = `${newCharacter.infos.name} est un ${newCharacter.infos.class} ${newCharacter.infos.type}.`
            const adjective = `Il est ${descriptionPhrases.adjectives[Math.floor(Math.random() * descriptionPhrases.adjectives.length)]}.`
            const liked = `Il aime ${descriptionPhrases.likes[Math.floor(Math.random() * descriptionPhrases.likes.length)]}.`
            const disliked = `Il déteste ${descriptionPhrases.dislikes[Math.floor(Math.random() * descriptionPhrases.dislikes.length)]}.`
            const family = descriptionPhrases.family[Math.floor(Math.random() * descriptionPhrases.family.length)]
            const objective = descriptionPhrases.objective[Math.floor(Math.random() * descriptionPhrases.objective.length)]
            newCharacter.description = `${baseDesc} ${adjective} ${liked} ${disliked} ${family} ${objective}`
            updateOneCharacter(newCharacter);    
            getOneClass(newCharacter.infos.class)        
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CharactersContext.Provider value={{ characters, character, classes, selectedClass, setCharacter, getOneCharacter, updateOneCharacter, createOneCharacter, removeCharacter, getCharactersByUserId, createRandomisedCharacter }}>
            {children}
        </CharactersContext.Provider>
    )
}