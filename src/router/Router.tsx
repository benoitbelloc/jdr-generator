import { Routes, Route } from 'react-router-dom';
import Character from '../views/character/Character';
import Home from '../views/home/Home';

export default function Router() {
  return (
    <div className="Router">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character/:id" element={<Character />} />
        </Routes>
    </div>
  );
}
