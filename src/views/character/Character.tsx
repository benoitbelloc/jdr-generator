import './Character.css'
import { Character as CharacterType } from '../main-content/MainContent';

function Character(props: {list: CharacterType[]}) {  

  return (
    <div className="character" style={{width: '90%', height: '90%'}}>
      <div className="main-data">
        <div className='avatar-stats'></div>
        <div className='infos'></div>
      </div>
      <div className="secondary-data">
        <div className='personnality'></div>
        <div className='competences'>
          <div className='competences-1'></div>
          <div className='competences-2'></div>
        </div>
      </div>

    </div>
  )
}

export default Character
