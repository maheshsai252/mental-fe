import React from "react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button } from "@mui/material";
import "./login.css";
import './signin.css'
import { MDBBtn } from "mdb-react-ui-kit";
import LoginIcon from "@mui/icons-material/Login";
import { login } from "../services/login-service";
import { getUserThunk } from "../services/user-thunk";
const Signin = ({ setIsAuthenticated, changeTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const [loginInput, setLoginInput] = useState({});

  const [loginLoading, setLoginLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginLoading(true);
    login(loginInput)
      .then((response) => {
        setLoginError(false);
        const { access } = response.data;
        console.log(response.data);
        localStorage.setItem("accessToken", access);
        console.log(access)
        dispatch(getUserThunk());
        setIsAuthenticated(true);
        console.log("login success");
        setLoginLoading(false);
        navigate("/");
      })
      .catch((e) => {
        setLoginError(true);
      });
  };

  const handleInput = (event) => {
    const name = event.target.name;
    const newValue = event.target.value;
    console.log(name, newValue);
    setLoginInput({
      ...loginInput,
      [name]: newValue,
    });
  };

  const setRegister = (event) => {
    changeTab("register");
  };

  return (
    <div style={{textAlign:'center', maxWidth: '97%', marginTop: '3rem'}} className="d-flex flex-column ms-3">
      <div className="text-center">
        <h1 style={{fontFamily: 'cursive', fontWeight: 'bold'}}>Therapy</h1>
        <h4 className="mt-1 mb-5 pb-1">WE ARE HERE FOR YOU</h4>
      </div>

      <p style={{textAlign: 'center'}}>Please login to your account</p>

      <form style={{ minWidth: '90%', margin: 'auto' }} onSubmit={handleSubmit}>
        <Grid container alignItems="center" direction="column" spacing={3}>
          <Grid item xs={6} className="wd-login-item">
            {
              <TextField
                fullWidth
                required
                aria-label="username text box"
                name="username"
                type="text"
                label="Username"
                onChange={handleInput}
              />
            }
          </Grid>
          <Grid item xs={6} className="wd-login-item">
            {
              <TextField
                required
                fullWidth
                aria-label="password text box"
                name="password"
                label="Password"
                type="password"
                onChange={handleInput}
              />
            }
          </Grid>

          <Grid item xs={12} className="login-full-width">
            {/* <Button className='wd-submit-btn' variant="contained">
                                Login
                            </Button> */}

            <Button
              className="wd-submit-btn-login"
             
              startIcon={<LoginIcon />}
              variant="contained"
              aria-label="submit button"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* <div className="d-flex flex-row align-items-center justify-content-center pb-4 mt-4">
        <p className="mb-0">Don't have an account?</p>
        <MDBBtn outline className="mx-2" color="primary" onClick={setRegister}>
          Register
        </MDBBtn>
      </div> */}
    </div>
  );
};

export default Signin;
