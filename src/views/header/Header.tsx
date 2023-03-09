import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {

  return (
    <div className="header">
      <div className='header-link'><NavLink to="/">Home</NavLink></div>
      <div className='header-link'><NavLink to="/character">Character</NavLink></div>
    </div>
  )
}

export default Header
