import { CharacterTraitsAndCompetencesProps } from '../../types/Types';
import './Character.css'

export default function CharacterCompetences(props: CharacterTraitsAndCompetencesProps) {  
    const { character, changeValue, saveChange } = props;
  return (
    <div className='competences-1'>
        <input id="level" className='stats' type="number" name="level" min="1" max="20" value={character.stats.level} onChange={changeValue} onBlur={saveChange}></input>
        <div className='stats-container'>
            <p className='stat'>
            <span className='stat-name'>HP</span>
            <input className='stats stat-number' type="number" name="hp" min="0" max="20" value={character.stats.hp} onChange={changeValue} onBlur={saveChange}></input>
            </p>
            <p className='stat'>
            <span className='stat-name'>MP</span>
            <input className='stats stat-number' type="number" name="mp" min="0" max="20" value={character.stats.mp} onChange={changeValue} onBlur={saveChange}></input>
            </p>
            <p className='stat'>
            <span className='stat-name'>ATK</span>
            <input className='stats stat-number' type="number" name="atk" min="0" max="20" value={character.stats.atk} onChange={changeValue} onBlur={saveChange}></input>
            </p>
            <p className='stat'>
            <span className='stat-name'>DEF</span>
            <input className='stats stat-number' type="number" name="def" min="0" max="20" value={character.stats.def} onChange={changeValue} onBlur={saveChange}></input>
            </p>
        </div>
    </div>
  )
}