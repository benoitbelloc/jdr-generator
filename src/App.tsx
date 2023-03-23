import './App.css'
import Header from './views/main-content/MainContent'
import Router from './router/Router'
import CharactersProvider from './providers/characters-provider/CharactersProvider'

function App() {

  return (
    <div className="App">
      <CharactersProvider>
        <Header />
      </CharactersProvider>
    </div>
  )
}

export default App
