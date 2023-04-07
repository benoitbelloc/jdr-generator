import { Character as CharacterType } from '../main-content/MainContent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import './Home.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from 'react';
import { CharactersContext } from '../../providers/characters-provider/CharactersProvider';
import { UsersContext } from '../../providers/users-provider/UsersProvider';

function Home() {
  const navivate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { characters, getCharactersByUserId } = React.useContext(CharactersContext);  
  const { user } = React.useContext(UsersContext);  

  React.useEffect(() => {    
    if (!user || user === null) return navivate('/');
    getCharactersByUserId();
  }, [id, user]);

  return (
    <div className="cards-container">
        {user && characters.map((item: CharacterType, index: number)=>{
          return (
            <div key={index} className="card">
              <Card>
                <CardActionArea>
                      <CardMedia className="cardMedia" component={Link} to={"/character/" + item.id}>
                        <img className="cardImage" src={item.infos.avatar} />
                        <CardContent className="cardContent">
                          <h3>{item.infos.name}</h3>
                          <h5>{item.infos.class}</h5>
                          <p>{item.description}</p>
                        </CardContent>
                      </CardMedia>
                    </CardActionArea>
              </Card>
            </div>
          )
        })}
    </div>
  )
}

export default Home
