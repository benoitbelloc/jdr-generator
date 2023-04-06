import './App.css'
import Header from './views/main-content/MainContent'
import Router from './router/Router'
import CharactersProvider from './providers/characters-provider/CharactersProvider'
import UsersProvider from './providers/users-provider/UsersProvider'

function App() {

  return (
    <div className="App">
      <UsersProvider>
        <CharactersProvider>
          <Header />
        </CharactersProvider>
      </UsersProvider>
    </div>
  )
}

export default App
