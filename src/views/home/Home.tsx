import { Character as CharacterType } from '../main-content/MainContent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import './Home.css';
import { Link } from "react-router-dom";

function Home(props: {list: CharacterType[]}) {    

  return (
    <div className="character" style={{width: '90%', height: '90%'}}>
      <Card className="card">
        <CardActionArea>
        {props.list.map((item: CharacterType, index: number)=>{
          return (
            <div key={index}>
              <CardMedia className="cardMedia" component={Link} to={"/character/" + item.id} sx={{ display: 'block', color: 'black' }}>
                <img src={item.infos.avatar} />
              </CardMedia>
              <CardContent className="cardContent">
                <h3>{item.infos.name}</h3>
                <h5>{item.infos.class}</h5>
                <p>{item.description}</p>
              </CardContent>
            </div>
          )
        })}
        </CardActionArea>
      </Card>
    </div>
  )
}

export default Home
