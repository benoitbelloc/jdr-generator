import './Character.css'
import { Character as CharacterType } from '../main-content/MainContent';
import { useLocation } from 'react-router-dom';
import React from 'react';
import { CharactersContext } from '../../providers/characters-provider/CharactersProvider';

function Character() {  
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { character, getOneCharacter } = React.useContext(CharactersContext);
  
  if (id && !character) getOneCharacter(id);

  React.useEffect(() => {
    if (id) getOneCharacter(id);    
  }, [id])
    
  return (
    <div >
      {character &&
      <div className="character">
      <div className="main-data">
        <div className='avatar-stats'>
          <div className='avatar'>
            <img src={character.infos.avatar} alt={"Image de " + character.infos.name} height={150} width={150} className="image" />
            <p className='info'>{character.infos.name}</p>
            <p className='info'>{character.infos.type}</p>
            <p className='info'>{character.infos.class}</p>
          </div>
        </div>
        <div className='description'>
          <div className='text'>
            {character.description}
          </div>
        </div>
      </div>
      <div className="secondary-data">
        <div className='talents'>
          <div id='intellect' className='talents-trait'>
            <p className='trait-name'>Intelligence</p>
            <p className='trait-number'>
              {character.talents.intellect}
            </p>
          </div>
          <div id='physical' className='talents-trait'>
            <p className='trait-name'>Physique</p>
            <p className='trait-number'>
              {character.talents.physical}
            </p>
          </div>
          <div id='dexterity' className='talents-trait'>
            <p className='trait-name'>Dextérité</p>
            <p className='trait-number'>
              {character.talents.dexterity}
            </p>
          </div>
          <div id='charism' className='talents-trait'>
            <p className='trait-name'>Charisme</p>
            <p className='trait-number'>
              {character.talents.charism}
            </p>
          </div>
        </div>
        <div className='competences'>
          <div className='competences-1'>
            <div className='level'>
              {character.stats.level}
            </div>
            <div className='stats'>
              <p className='stat'>
                <span className='stat-name'>HP</span>
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

    </div>
  )
}

export default Character
