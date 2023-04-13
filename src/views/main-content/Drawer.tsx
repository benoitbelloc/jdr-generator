import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from "react-router-dom";
import { CharactersContext } from '../../providers/characters-provider/CharactersProvider';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { UsersContext } from '../../providers/users-provider/UsersProvider';
import { DrawerHeader } from './MainContent';
import { Character } from '../../types/Types';

const drawerWidth = '100vw';

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

export default function DrawerComponent(props: { open: boolean, handleDrawerClose: () => void, isMobile: boolean }) {
  const { open, handleDrawerClose, isMobile } = props;
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const theme = useTheme();
  const { characters, createOneCharacter, getCharactersByUserId } = React.useContext(CharactersContext);
  const {user} = React.useContext(UsersContext)  

  React.useEffect(() => {
    if (user) getCharactersByUserId();
  }, [id, user]);

  const createCharacter = () => {
    createOneCharacter();
  }

  return (
    <Drawer variant="permanent" open={open} sx={{
      display: isMobile && !open ? 'none' : 'block',
      }}>
        {open && "HELLO"}
        {isMobile && "hELLO"}
        <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            {characters && user && characters.map((item: Character) => (
            <ListItem key={item.id} disablePadding sx={{ display: 'block', color: 'black' }} component={Link} to={"/character/" + item.id} onClick={handleDrawerClose}>
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open && !isMobile ? 'initial' : 'center',
                    px: 2.5,
                }}
                >
                <ListItemIcon
                    sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    }}
                >
                    <img src={item.infos.avatar} alt={"Image de " + item.infos.name} height={50} width={50} style={{borderRadius: '50%'}} />
                </ListItemIcon>
                <ListItemText primary={item.infos.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
            ))}

            {user && <ListItem disablePadding sx={{ display: 'block', color: 'black', fontSize:'60px', marginLeft: '0' }} onClick={createCharacter}>
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
            </ListItem>}
        </List>
    </Drawer>
  );
}