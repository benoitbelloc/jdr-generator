import { CharacterWeaponsProps } from '../../types/Types';
import './Character.css'
import AddIcon from '@mui/icons-material/Add';
import { CharactersContext } from '../../providers/characters-provider/CharactersProvider';
import React from 'react';

export default function CharacterWeapons(props: CharacterWeaponsProps) {  
    const { addWeapon, changeWeapon, saveChange, deleteWeapon } = props;
    const { character, selectedClass } = React.useContext(CharactersContext);
    
    return (
        <div className='competences-2'>
        <AddIcon fontSize='inherit' style={{fontSize: "50px", right: '0', position: 'absolute'}} onClick={addWeapon} />
        <p className='title'>Armes</p>
        <div className='weapons'>
            <ul className='weapons-list'>
            {character.weapons ? character.weapons.map((weapon: string, index: number) => (
                <li key={index}>
                {weapon === ''
                ?
                <span>
                    <select id="focus" className='weapon' name={index.toString()} value={weapon} onChange={changeWeapon} >
                        {selectedClass.weapons.map((classWeapon: string, i: number) => {
                            return <option key={i} value={classWeapon}>{classWeapon}</option>
                        })}
                    </select>
                    <label id={index.toString()} onClick={deleteWeapon}>x</label>
                </span>
                :
                <span>
                    {selectedClass && <select className='weapon no-focus' name={index.toString()} value={weapon} onChange={changeWeapon} >
                        {selectedClass.weapons.map((classWeapon: string, i: number) => {
                            return <option key={i} value={classWeapon}>{classWeapon}</option>
                        })}
                    </select>}
                    <label id={index.toString()} onClick={deleteWeapon}>x</label>
                </span>
                }
                </li>
            )) : null}
            </ul>
        </div>
        </div>
  )
}