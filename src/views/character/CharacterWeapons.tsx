import './Character.css'
import { Character } from '../main-content/MainContent';
import AddIcon from '@mui/icons-material/Add';

type CharacterWeaponsProps = {
    character: Character,
    addWeapon: () => void,
    changeWeapon: (event: {target: {name: string, value: string}}) => void,
    saveChange: (event: {target: {name: string, value: string}}) => void,
    deleteWeapon: (event: any) => void
}

export default function CharacterWeapons(props: CharacterWeaponsProps) {  
    const { character, addWeapon, changeWeapon, saveChange, deleteWeapon } = props;
    return (
        <div className='competences-2'>
        <AddIcon fontSize='inherit' style={{fontSize: "50px", right: '0', position: 'absolute'}} onClick={addWeapon} />
        <p className='title'>Weapons</p>
        <div className='weapons'>
            <ul className='weapons-list'>
            {character.weapons.map((weapon: string, index: number) => (
                <li key={index}>
                {weapon === ''
                ?
                <span>
                    <input id="focus" className='weapon' type="text" name={index.toString()} value={weapon} onChange={changeWeapon} onBlur={saveChange} autoFocus></input>
                    <label id={index.toString()} onClick={deleteWeapon}>x</label>
                </span>
                :
                <span>
                    <input className='weapon no-focus' type="text" name={index.toString()} value={weapon} onChange={changeWeapon} onBlur={saveChange}></input>
                    <label id={index.toString()} onClick={deleteWeapon}>x</label>
                </span>
                }
                </li>
            ))}
            </ul>
        </div>
        </div>
  )
}