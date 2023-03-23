import { Routes, Route } from 'react-router-dom';
import { Character as CharacterType } from '../views/main-content/MainContent';
import Character from '../views/character/Character';
import Home from '../views/home/Home';

function Router(props: {list: CharacterType[]}) {
  return (
    <div className="Router">
      <Routes>
        <Route path="/" element={<Home list={props.list} />} />
        <Route path="/character/:id" element={<Character list={props.list} />} />
      </Routes>
    </div>
  );
}

export default Router;
