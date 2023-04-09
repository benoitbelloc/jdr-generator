import { CharacterMainDataProps } from '../../types/Types';
import './Character.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function CharacterMainData(props: CharacterMainDataProps) { 
    const { character, deleteCharacter, changeValue, saveChange, handleOpen } = props;
    return (

      <div className="main-data">
        <div className='avatar-stats'>
          <div className='avatar'style={{position: 'relative'}} >
            <DeleteOutlineIcon fontSize='inherit' style={{fontSize: "50px", float: 'left', position: 'absolute'}} onClick={deleteCharacter} />
            <img src={character.infos.avatar} alt={"Image de " + character.infos.name} height={150} width={150} className="image" onClick={handleOpen} />
            <input className='infos' type="text" name="name" value={character.infos.name} onChange={changeValue} onBlur={saveChange}></input>
            <input className='infos' type="text" name="type" value={character.infos.type} onChange={changeValue} onBlur={saveChange}></input>
            <input className='infos' type="text" name="class" value={character.infos.class} onChange={changeValue} onBlur={saveChange}></input>
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