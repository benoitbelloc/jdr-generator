import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Router from '../../router/Router';
import { useLocation } from "react-router-dom";
import { CharactersContext } from '../../providers/characters-provider/CharactersProvider';
import { UsersContext } from '../../providers/users-provider/UsersProvider';
import AppBar from './AppBar';
import DrawerComponent from './Drawer';

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MainContent() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { getCharactersByUserId, classes, getAllClasses } = React.useContext(CharactersContext);
  const { user, getUserFromLocalStorage } = React.useContext(UsersContext)  

  React.useEffect(() => {
    if (!user || user === null) getUserFromLocalStorage()
    if (user) getCharactersByUserId();
    if (user && classes.length === 0) getAllClasses();
  }, [id, user]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar />
      <DrawerComponent />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Router />
      </Box>
    </Box>
  );
}