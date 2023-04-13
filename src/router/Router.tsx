import { Routes, Route } from 'react-router-dom';
import Character from '../views/character/Character';
import Home from '../views/home/Home';
import Register from '../views/register/Register';

export default function Router() {
  return (
    <div className="Router">
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/character/:id" element={<Character />} />
            <Route path="/" element={<Register />}/>
        </Routes>
    </div>
  );
}
