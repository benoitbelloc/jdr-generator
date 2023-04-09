import './Character.css'
import { Box, Button, Modal, Typography } from '@mui/material';

type CharacterAvatarModalProps = {
    open: boolean,
    changeValue: (event: {target: {className: string, classList: string[] | any, name: string, value: string}}) => void,
    saveChange: () => void
    handleClose: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function CharacterAvatarModal(props: CharacterAvatarModalProps)  {  
    const { open, changeValue, saveChange, handleClose } = props;
    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Change the character's avatar
            </Typography>
            <input
                id="outlined-required"
                className='infos'
                type="text"
                name="avatar"
                style={{width: '200px', height: '30px', margin: '10px 0'}}
                // value={character && character.infos.avatar}
                onChange={changeValue}
            />
            <Button variant="outlined" style={{margin: '13px 0'}} onClick={saveChange}>Submit</Button>
        </Box>
        </Modal>
    )
}