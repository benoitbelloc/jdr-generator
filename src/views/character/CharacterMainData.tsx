import React from 'react';
import { CharacterMainDataProps, Class } from '../../types/Types';
import './Character.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CharactersContext, types } from '../../providers/characters-provider/CharactersProvider';
import ShuffleIcon from '@mui/icons-material/Shuffle';

export default function CharacterMainData(props: CharacterMainDataProps) { 
    const { deleteCharacter, selectValue, changeValue, saveChange, handleOpen } = props;
    const { character, classes, createRandomisedCharacter } = React.useContext(CharactersContext);


    // Randomiser
  const shuffle = async () => {
    createRandomisedCharacter();
  }

    return (
      <div className="main-data">
        <div className='avatar-stats'>
          <div className='avatar'style={{position: 'relative'}} >
            <DeleteOutlineIcon fontSize='inherit' style={{fontSize: "50px", float: 'left', position: 'absolute'}} onClick={deleteCharacter} />
            <ShuffleIcon className='shuffle' fontSize='small' style={{fontSize: "50px", right: '0', position: 'absolute'}} onClick={shuffle} />
            <img src={character.infos.avatar} alt={"Image de " + character.infos.name} height={150} width={150} className="image" onClick={handleOpen} />
            
            <input className='infos' type="text" name="name" value={character.infos.name} onChange={changeValue} onBlur={saveChange}></input>
            
            <select className='infos' name="type" value={character.infos.type} onChange={selectValue} >
                {types.map((type, index) => {
                    return <option key={index} value={type}>{type}</option>
                })}
            </select>

            <select className='infos' name="class" value={character.infos.class} onChange={selectValue} >
                {classes.map((oneClass: Class, index: number) => <option key={index} value={oneClass.name}>{oneClass.name}</option>)}
            </select>

          </div>
        </div>
        <div className='text'>
          <textarea className='description' value={character.description} onChange={changeValue} onBlur={saveChange}>
            {character.description}
          </textarea>
        </div>
      </div>
  )
}