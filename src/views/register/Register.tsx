import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { UsersContext } from '../../providers/users-provider/UsersProvider';
import './Register.css';

export default function Register(){
    const navivate = useNavigate();
    const [name, setName] = React.useState('')
    const {user, login} = React.useContext(UsersContext)

    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    };

    React.useEffect(() => {        
        if (user && user !== null) navivate('/home');
      }, [user]);

    const checkUser = () => {
        if (name !== '') {
            login(name)
        } else {
            alert('Please enter a name')
        }
    };

    const validateWithEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            checkUser()
        }
    };

    return(
        <div className='container'>
            <TextField
                className='input-register'
                id="outlined-required"
                label="Pseudo"
                size="small"
                value={name}
                onChange={changeValue}
                onKeyUp={validateWithEnter}
            />
            <Button className='button-register' variant="outlined" onClick={checkUser}>Submit</Button>
        </div>
    )
}