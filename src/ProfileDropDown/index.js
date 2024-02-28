import './index.css';

import * as React from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { getUserThunk } from '../services/user-thunk';
const ProfileDropDown = ({ handleClose, anchorEl, open }) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const handleLogout = () => {
        handleClose()
        localStorage.removeItem("accessToken")
        navigate("/login")
        dispatch(getUserThunk())
    }

    return (
        <Menu
            className='profile-menu'
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleLogout}>
                <LogoutIcon  style={{color: 'red'}}/>
                <span className='logout-text'>Logout </span>
            </MenuItem>
        </Menu>
    );
}

export default ProfileDropDown;