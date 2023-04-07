import './Character.css'
import { CharacterInfos, CharacterStats, CharacterTalents } from '../main-content/MainContent';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { CharactersContext } from '../../providers/characters-provider/CharactersProvider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { UsersContext } from '../../providers/users-provider/UsersProvider';

function Character() {  
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { character, setCharacter, getOneCharacter, updateOneCharacter, removeCharacter } = React.useContext(CharactersContext);
  const { user } = React.useContext(UsersContext);

  if (!character) getOneCharacter(id);

  React.useEffect(() => {
    getOneCharacter(id)
  }, [id])

  const changeValue = (event: any) => {
    const className = event.target.className;
    const name = event.target.name;
    const value = event.target.value;
    
    if (className === 'infos') {
      const infos: CharacterInfos = {
        ...character.infos,
        [name]: value
      }
      setCharacter({...character, infos})      
    } else if (className === 'description') {
      setCharacter({...character, description: value})
    } else if (className === 'talents') {
      const newTalents: CharacterTalents = {
        ...character.talents,
        [name]: value
      }
      setCharacter({...character, talents: newTalents})
    } else if (className === 'stats') {
      const newStats: CharacterStats = {
        ...character.stats,
        [name]: value
      }
      setCharacter({...character, stats: newStats})
    }
  }

  const saveChange = () => {
    updateOneCharacter(character);
  }

  const deleteCharacter = () => {
    removeCharacter(character.id);
    navigate('/');
  }
    
  return (
    <div >
      {user && character && <div className="character">
      <div className="main-data">
        <div className='avatar-stats'>
          <div className='avatar'style={{position: 'relative'}} >
            <DeleteOutlineIcon fontSize='inherit' style={{fontSize: "50px", float: 'left', position: 'absolute'}} onClick={deleteCharacter} />
            <img src={character.infos.avatar} alt={"Image de " + character.infos.name} height={150} width={150} className="image" />
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
      <div className="secondary-data">
        <div className='traits'>
          <div id='intellect' className='talents-trait'>
            <p className='trait-name'>Intelligence</p>
            <input className='talents' type="number" name="intellect" min="0" max="20" value={character.talents.intellect} onChange={changeValue} onBlur={saveChange}></input>
          </div>
          <div id='physical' className='talents-trait'>
            <p className='trait-name'>Physique</p>
            <input className='talents' type="number" name="physical" min="0" max="20" value={character.talents.physical} onChange={changeValue} onBlur={saveChange}></input>
          </div>
          <div id='dexterity' className='talents-trait'>
            <p className='trait-name'>Dextérité</p>
            <input className='talents' type="number" name="dexterity" min="0" max="20" value={character.talents.dexterity} onChange={changeValue} onBlur={saveChange}></input>
          </div>
          <div id='charism' className='talents-trait'>
            <p className='trait-name'>Charisme</p>
            <input className='talents' type="number" name="charism" min="0" max="20" value={character.talents.charism} onChange={changeValue} onBlur={saveChange}></input>
          </div>
        </div>
        <div className='competences'>
          <div className='competences-1'>
            <input id="level" className='stats' type="number" name="level" min="1" max="20" value={character.stats.level} onChange={changeValue} onBlur={saveChange}></input>
            <div className='stats-container'>
              <p className='stat'>
                <span className='stat-name'>HP</span>
                {/* <input id="stat-number" className='stats' type="number" name="hp" min="0" max="20" value={character.stats.hp} onChange={changeValue} onBlur={saveChange}></input> */}
                <span className='stat-number'>{character.stats.hp}</span>
              </p>
              <p className='stat'>
                <span className='stat-name'>MP</span>
                <span className='stat-number'>{character.stats.mp}</span>
              </p>
              <p className='stat'>
                <span className='stat-name'>ATK</span>
                <span className='stat-number'>{character.stats.atk}</span>
              </p>
              <p className='stat'>
                <span className='stat-name'>DEF</span>
                <span className='stat-number'>{character.stats.def}</span>
              </p>
            </div>
          </div>
          <div className='competences-2'>
            <p className='title'>Weapons</p>
            <div className='weapons'>
              <ul>
                {character.weapons.map((weapon: string, index: number) => (
                  <li key={index}>{weapon}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>}
      {/* } */}

    </div>
  )
}

export default Character
