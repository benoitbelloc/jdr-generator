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
import { AppBarProps } from '../../interfaces/Types';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import './MainContent.css'
import { DarkModeContext } from '../../providers/darkmode-provider/DarkModeProvider';

const drawerWidth = '100vw';

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

type MainContentProps = {
  open: boolean;
  handleDrawerOpen: () => void;
  isMobile: boolean;
};

export default function MainContent(props: MainContentProps) {
  const { open, handleDrawerOpen, isMobile } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { getCharactersByUserId } = React.useContext(CharactersContext);
  const {user, logout} = React.useContext(UsersContext)  
  const { darkMode, toggleDarkMode } = React.useContext(DarkModeContext);

  React.useEffect(() => {
    if (user) getCharactersByUserId();
  }, [id, user]);

  const goHome = () => {
    navigate('/home');
  }

  const theme = useTheme();

  const toggleMode = () => {
    toggleDarkMode();
  };

  return (
    <AppBar position="fixed" sx={{backgroundColor: darkMode ? 'black' : 'white', color: darkMode ? 'white' : 'black'}} open={open}>
    <Toolbar sx={{color: darkMode ? 'white' : 'black', textDecoration: 'none'}}>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
            marginRight: 5,
            ...((!isMobile || !user) && { display: 'none' }),
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
        <div className="darkmode">
          <IconButton sx={{ ml: 1}} onClick={toggleMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
    </Toolbar>
    </AppBar>
  );
}
