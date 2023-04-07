import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Router from '../../router/Router';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CharactersContext } from '../../providers/characters-provider/CharactersProvider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { UsersContext } from '../../providers/users-provider/UsersProvider';

export type CharacterInfos = {
    avatar: string,
    name: string,
    type: string,
    class: string
}

export type CharacterStats = {
  level: number,
  hp: number,
  mp: number,
  atk: number,
  def: number,
}

export type CharacterTalents = {
  physical: number,
  intellect: number,
  dexterity: number,
  charism: number,
}

export type Character = {
  id?: number,
  userId?: number,
  infos: CharacterInfos,
  stats: CharacterStats,
  talents: CharacterTalents,
  weapons: string[],
  description: string,
}

export type User = {
  [x: string]: any;
  id: number,
  username: string
  characterId: number,
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MainContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const theme = useTheme();
  const { characters, getAllCharacters, createOneCharacter } = React.useContext(CharactersContext);
  const {user, logout} = React.useContext(UsersContext)  

  React.useEffect(() => {
    getAllCharacters();
  }, [id, user]);

  const createCharacter = () => {
    createOneCharacter();
    setTimeout(() => {
      navigate('/character/' + (characters.length + 1));
    }, 100);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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
          <a href="/home" style={{textDecoration: 'none', color: 'black'}}><Typography variant="h6" noWrap component="div">
            JDR-Generator
          </Typography></a>
          {user && <Typography variant="h6" noWrap component="div" style={{marginLeft: '50px'}} onClick={logout}>
            Logout
          </Typography>}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {characters ? characters.map((item: Character) => (
            <ListItem key={item.id} disablePadding sx={{ display: 'block', color: 'black' }} component={Link} to={"/character/" + item.id}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={item.infos.avatar} alt={"Image de " + item.infos.name} height={50} width={50} style={{borderRadius: '50%'}} />
                </ListItemIcon>
                <ListItemText primary={item.infos.name} sx={{ opacity: 0 }} />
              </ListItemButton>
            </ListItem>
          )) : null}
          <ListItem disablePadding sx={{ display: 'block', color: 'black', fontSize:'60px', marginLeft: '0' }} onClick={createCharacter}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AddCircleOutlineIcon fontSize='inherit' />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Router />
      </Box>
    </Box>
  );
}