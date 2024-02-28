import { NavLink } from "react-router-dom";
import "./index.css";
import { useSelector } from "react-redux";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import ProfileDropDown from "../ProfileDropDown";
import { axiosRequest } from "../services/utils/axios";
import { getUser } from "../services/login-service";
function NavbarComponent() {
  const [ currentUser, setUser ] = useState(null);
  useEffect(()=>  {
    const get = async () => {
      const userData = await getUser();
      setUser(userData)
    }
    get()
  }, [])
  const [profileOpen, setProfileOpen] = useState(false);

  const handleProfileOpen = (event) => {
    setProfileOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClose = () => {
    setAnchorEl(null);
    setProfileOpen(false);
  };

  return (
    <nav role="navigation">
      <div className="top-nav">
        <div className="team-logo-container">
          <div className="team-logo-team-text">

            <a href="/" >
              <div className="logo-style" >
              <h2 style={{fontFamily: 'cursive'}}>Therapy</h2>
              </div>
            </a>

          </div>
        </div>
        <div className="navigation-left-container" tabIndex={0}>
            
          
          <div>
            {currentUser?.username && (
              <div
                className="nav-bar-profile nav-link"
                onClick={handleProfileOpen}
              >
                <AccountCircleIcon style={{ color: 'white' }} />
                <span className="nav-bar-username">
                  {currentUser?.username}
                </span>
                <ExpandMoreIcon />
              </div>
            )}
            {!currentUser?.username && (
              <NavLink to="/login" className="nav-link">
                <div tabIndex={0} aria-label="link to login">
                Login
                </div>
                
              </NavLink>
            )}
            {/* {`${currentUser.username ? <div>{currentUser.username}</div> : <NavLink to="/login" className='nav-link'>Login</NavLink>}`} */}
          </div>
          {/* <NavLink to="/login" className='nav-link'>
                    {`${currentUser.username ? currentUser.username : "Login"}`}</NavLink> */}
        </div>

        {profileOpen && (
          <ProfileDropDown
            anchorEl={anchorEl}
            handleClose={handleProfileClose}
            open={profileOpen}
          />
        )}
      </div>
    </nav>
  );
}

export default NavbarComponent;