import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from "react-router-dom";
import { CharactersContext } from '../../providers/characters-provider/CharactersProvider';
import { UsersContext } from '../../providers/users-provider/UsersProvider';
import { AppBarProps } from '../../types/Types';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function MainContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { getCharactersByUserId } = React.useContext(CharactersContext);
  const {user, logout} = React.useContext(UsersContext)  

  React.useEffect(() => {
    if (user) getCharactersByUserId();
  }, [id, user]);

  const goHome = () => {
    navigate('/home');
  }

  return (
    <AppBar position="fixed" sx={{backgroundColor: 'white', color: 'black'}}>
    <Toolbar sx={{color: 'black', textDecoration: 'none'}}>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        sx={{
            marginRight: 5,
            ...({ display: 'none' }),
        }}
        >
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" onClick={goHome}>
        JDR-Generator
        </Typography>
        {user && <Typography variant="h6" noWrap component="div" style={{marginLeft: '50px'}} onClick={logout}>
        Logout
        </Typography>}
    </Toolbar>
    </AppBar>
  );
}