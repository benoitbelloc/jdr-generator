import React from 'react'
import './App.css'
import CharactersProvider from './providers/characters-provider/CharactersProvider'
import UsersProvider from './providers/users-provider/UsersProvider'
import Router from './router/Router'
import MainContent from './views/main-content/MainContent'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DarkModeProvider from './providers/darkmode-provider/DarkModeProvider'
import { ColorModeContext } from './providers/darkmode-provider/DarkModeProvider'

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  
  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <DarkModeProvider>
        <ThemeProvider theme={theme}>
          <UsersProvider>
            <CharactersProvider>
              <MainContent />
              <Router />
            </CharactersProvider>
          </UsersProvider>
        </ThemeProvider>
        </DarkModeProvider>
      </ColorModeContext.Provider>
    </div>
  )
}

export default App
