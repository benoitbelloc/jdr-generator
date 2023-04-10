import './Character.css'
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { CharactersContext } from '../../providers/characters-provider/CharactersProvider';
import { UsersContext } from '../../providers/users-provider/UsersProvider';
import CharacterMainData from './CharacterMainData';
import CharacterTraits from './CharacterTraits';
import CharacterCompetences from './CharacterCompetences';
import CharacterWeapons from './CharacterWeapons';
import CharacterAvatarModal from './CharacterAvatarModal';
import { Character as CharacterType, CharacterInfos, CharacterStats, CharacterTalents } from '../../types/Types';
import ShuffleIcon from '@mui/icons-material/Shuffle';

export default function Character() {  
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { character, setCharacter, getOneCharacter, updateOneCharacter, removeCharacter, createRandomisedCharacter } = React.useContext(CharactersContext);
  const { user } = React.useContext(UsersContext);

  if (!character) getOneCharacter(id);

  React.useEffect(() => {
    if (!user || user === null) return navigate('/');
    getOneCharacter(id)
  }, [id, user])

  const changeValue = (event: {target: {className: string, classList: string[] | any, name: string, value: string}}) => {   
    console.log(event.target);
     
    const className = event.target.className ? event.target.className : '';
    const classList = event.target.classList ? event.target.classList : [];
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
    } else if (classList.contains('stats')) {
      const newStats: CharacterStats = {
        ...character.stats,
        [name]: value
      }
      setCharacter({...character, stats: newStats})      
    } 
  }

  const saveChange = () => {
    updateOneCharacter(character);
    if (open) setOpen(false);
  }

  const deleteCharacter = () => {
    removeCharacter(character.id);
    navigate('/');
  }

  // Weapons
  const addWeapon = () => {
    const newWeapons = [...character.weapons, ''];
    setCharacter({...character, weapons: newWeapons})
  }

  const changeWeapon = (event: {target: {name: string, value: string}}) => {    
    const index = parseInt(event.target.name, 10);
    const value = event.target.value;
    const weaponsList = [...character.weapons];
    weaponsList[index] = value;
    setCharacter({...character, weapons: weaponsList})
  }

  const deleteWeapon = (event: any) => {
    const index = parseInt(event.target.id, 10);
    const weaponsList = [...character.weapons];    
    weaponsList.splice(index, 1);
    updateOneCharacter({...character, weapons: weaponsList});
  }

  // Modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Randomiser
  const test = async () => {
    createRandomisedCharacter();
    // const response = await fetch('https://random-data-api.com/api/v2/users')
    // const data = await response.json();
    // const name = data.first_name;
    // const newCharacter: CharacterType = {
    //   id: character.id,
    //   userId: character.userId,
    //   infos: {
    //     name,
    //     type: types[Math.floor(Math.random() * types.length)],
    //     class: classes[Math.floor(Math.random() * classes.length)],
    //   },
    //   stats: {
    //     level: 1,
    //     hp: Math.floor(Math.random() * 100),
    //     mp: Math.floor(Math.random() * 100),
    //     atk: Math.floor(Math.random() * 100),
    //     def: Math.floor(Math.random() * 100),
    //   },
    //   talents: {
    //     physical: Math.floor(Math.random() * 20),
    //     intellect: Math.floor(Math.random() * 20),
    //     dexterity: Math.floor(Math.random() * 20),
    //     charism: Math.floor(Math.random() * 20),
    //   },
    //   weapons: [
    //     weaponsList[Math.floor(Math.random() * weaponsList.length)],
    //     weaponsList[Math.floor(Math.random() * weaponsList.length)],
    //   ],
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl.',
    // }
    // const newClass = newCharacter.infos.class;
    // const newAvatar = avatars.find((avatar: {name: string, url: string}) => avatar.name === newClass)?.url;
    // newCharacter.infos.avatar = newAvatar;
    // setCharacter(newCharacter);
    // updateOneCharacter(newCharacter);
  }
   
  return (
    <div >
      {user && character && <div className="character">
      <ShuffleIcon fontSize='small' style={{fontSize: "50px", left: '0', position: 'absolute'}} onClick={test} />

      <CharacterMainData character={character} changeValue={changeValue} saveChange={saveChange} handleOpen={handleOpen} deleteCharacter={deleteCharacter} />
      <div className="secondary-data">
        <CharacterTraits character={character} changeValue={changeValue} saveChange={saveChange} />
        <div className='competences'>
          <CharacterCompetences character={character} changeValue={changeValue} saveChange={saveChange} />
          <CharacterWeapons character={character} saveChange={saveChange} addWeapon={addWeapon} changeWeapon={changeWeapon} deleteWeapon={deleteWeapon} />
        </div>
      </div>
      </div>}
      <CharacterAvatarModal open={open} changeValue={changeValue} handleClose={handleClose} saveChange={saveChange} />
    </div>
  )
}