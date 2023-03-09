import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Character from './views/character/Character'
import Header from './views/header/Header'

function App() {

  return (
    <div className="App">
      <Header />
      <Character />
    </div>
  )
}

export default App
