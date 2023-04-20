import { Routes, Route } from 'react-router-dom';
import Character from '../views/character/Character';
import Home from '../views/home/Home';
import Register from '../views/register/Register';

export default function Router() {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="Router" style={{marginBottom: isMobile  ? '150px' : 0}}>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/character/:id" element={<Character />} />
            <Route path="/" element={<Register />}/>
        </Routes>
    </div>
  );
}
