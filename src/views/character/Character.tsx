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
            <img src={character.infos.avatar} alt={"Image de " + character.infos.name} height={150} width={150} style={{borderRadius: '50%', marginLeft: '25%', marginTop: '10px'}} />
          </div>
        </div>
        <div className='infos'></div>
      </div>
      <div className="secondary-data">
        <div className='personnality'></div>
        <div className='competences'>
          <div className='competences-1'></div>
          <div className='competences-2'></div>
        </div>
      </div>
      </div>}

    </div>
  )
}

export default Character
