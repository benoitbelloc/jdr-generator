import React from 'react'
import './App.css'
import CharactersProvider from './providers/characters-provider/CharactersProvider'
import UsersProvider from './providers/users-provider/UsersProvider'
import Router from './router/Router'
import MainContent from './views/main-content/MainContent'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material'
import { ColorModeContext } from './views/main-content/AppBar'


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
        <ThemeProvider theme={theme}>
          <UsersProvider>
            <CharactersProvider>
              <MainContent />
              <Router />
            </CharactersProvider>
          </UsersProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  )
}

export default App
