import './Character.css'
import { Character as CharacterType, CharacterInfos, CharacterStats, CharacterTalents } from '../main-content/MainContent';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { CharactersContext } from '../../providers/characters-provider/CharactersProvider';
import { CircularProgress } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Character() {  
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { character, getOneCharacter, updateOneCharacter, removeCharacter } = React.useContext(CharactersContext);
  const [characterData, setCharacterData] = React.useState<CharacterType>(character);  
  const [loading, setLoading] = React.useState<boolean>(true);

  const setAllData = () => {
    setCharacterData(character);
  }

  if (!character) getOneCharacter(id);
  setTimeout(() => {
    setAllData();
  }, 100);
  setTimeout(() => {
    setLoading(false);
  }, 200);

  React.useEffect(() => {
    setLoading(true);
    getOneCharacter(id)
    setTimeout(() => {
      setAllData();
    }, 100);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [id])

  const changeValue = (event: any) => {
    const className = event.target.className;
    const name = event.target.name;
    const value = event.target.value;
    
    if (className === 'infos') {
      const newInfo: CharacterInfos = {
        ...characterData.infos,
        [name]: value
      }  
      setCharacterData({...characterData, infos: newInfo})
    } else if (className === 'description') {
      setCharacterData({...characterData, description: value})
    } else if (className === 'talents') {
      const newTalents: CharacterTalents = {
        ...characterData.talents,
        [name]: value
      }
      setCharacterData({...characterData, talents: newTalents})
    } else if (className === 'stats') {
      const newStats: CharacterStats = {
        ...characterData.stats,
        [name]: value
      }
      setCharacterData({...characterData, stats: newStats})
    }
  }

  const saveChange = () => {
    updateOneCharacter(characterData);
  }

  const deleteCharacter = () => {
    removeCharacter(characterData.id);
    navigate('/');
  }
    
  return (
    <div >
      { loading && <div className="loading"></div> }
      {/* {character && */}
      { !loading && <div className="character">
      <div className="main-data">
        <div className='avatar-stats'>
          <div className='avatar'style={{position: 'relative'}} >
            <DeleteOutlineIcon fontSize='inherit' style={{fontSize: "50px", float: 'left', position: 'absolute'}} onClick={deleteCharacter} />
            <img src={characterData.infos.avatar} alt={"Image de " + characterData.infos.name} height={150} width={150} className="image" />
            <input className='infos' type="text" name="name" value={characterData.infos.name} onChange={changeValue} onBlur={saveChange}></input>
            <input className='infos' type="text" name="type" value={characterData.infos.type} onChange={changeValue} onBlur={saveChange}></input>
            <input className='infos' type="text" name="class" value={characterData.infos.class} onChange={changeValue} onBlur={saveChange}></input>
          </div>
        </div>
        <div className='text'>
          <textarea className='description' value={characterData.description} onChange={changeValue} onBlur={saveChange}>
            {characterData.description}
          </textarea>
        </div>
      </div>
      <div className="secondary-data">
        <div className='traits'>
          <div id='intellect' className='talents-trait'>
            <p className='trait-name'>Intelligence</p>
            <input className='talents' type="number" name="intellect" min="0" max="20" value={characterData.talents.intellect} onChange={changeValue} onBlur={saveChange}></input>
          </div>
          <div id='physical' className='talents-trait'>
            <p className='trait-name'>Physique</p>
            <input className='talents' type="number" name="physical" min="0" max="20" value={characterData.talents.physical} onChange={changeValue} onBlur={saveChange}></input>
          </div>
          <div id='dexterity' className='talents-trait'>
            <p className='trait-name'>Dextérité</p>
            <input className='talents' type="number" name="dexterity" min="0" max="20" value={characterData.talents.dexterity} onChange={changeValue} onBlur={saveChange}></input>
          </div>
          <div id='charism' className='talents-trait'>
            <p className='trait-name'>Charisme</p>
            <input className='talents' type="number" name="charism" min="0" max="20" value={characterData.talents.charism} onChange={changeValue} onBlur={saveChange}></input>
          </div>
        </div>
        <div className='competences'>
          <div className='competences-1'>
            <input id="level" className='stats' type="number" name="level" min="1" max="20" value={characterData.stats.level} onChange={changeValue} onBlur={saveChange}></input>
            <div className='stats-container'>
              <p className='stat'>
                <span className='stat-name'>HP</span>
                {/* <input id="stat-number" className='stats' type="number" name="hp" min="0" max="20" value={characterData.stats.hp} onChange={changeValue} onBlur={saveChange}></input> */}
                <span className='stat-number'>{characterData.stats.hp}</span>
              </p>
              <p className='stat'>
                <span className='stat-name'>MP</span>
                <span className='stat-number'>{characterData.stats.mp}</span>
              </p>
              <p className='stat'>
                <span className='stat-name'>ATK</span>
                <span className='stat-number'>{characterData.stats.atk}</span>
              </p>
              <p className='stat'>
                <span className='stat-name'>DEF</span>
                <span className='stat-number'>{characterData.stats.def}</span>
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
