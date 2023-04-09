import { CharacterTraitsAndCompetencesProps } from '../../types/Types';
import './Character.css'

export default function CharacterTraits(props: CharacterTraitsAndCompetencesProps) {  
    const { character, changeValue, saveChange } = props;
  return (
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
  )
}