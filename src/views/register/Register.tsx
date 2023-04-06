import * as React from 'react';
import Router from '../../router/Router';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User } from '../main-content/MainContent';
import { Button } from '@mui/material';
import { UsersContext } from '../../providers/users-provider/UsersProvider';

function Register(){
    const [name, setName] = React.useState('')
    const {user, login} = React.useContext(UsersContext)

    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    };

    const checkUser = () => {
        if (name !== '') {
            login(name)
        } else {
            alert('Please enter a name')
        }
    };

    return(
        <div>
            <input type="text" onChange={changeValue} />
            <Button variant="outlined" onClick={checkUser}>Submit</Button>
        </div>
    )
}

export default Register;