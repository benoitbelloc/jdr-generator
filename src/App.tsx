import './App.css'
import CharactersProvider from './providers/characters-provider/CharactersProvider'
import UsersProvider from './providers/users-provider/UsersProvider'
import MainContent from './views/main-content/MainContent'

function App() {

  return (
    <div className="App">
      <UsersProvider>
        <CharactersProvider>
          <MainContent />
        </CharactersProvider>
      </UsersProvider>
    </div>
  )
}

export default App
