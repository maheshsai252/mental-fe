import React from "react";
import { useState } from "react";

import { Grid, TextField, Button } from "@mui/material";
import "./login.css";

import { MDBBtn } from "mdb-react-ui-kit";

import LoginIcon from "@mui/icons-material/Login";

const Register = ({ changeTab }) => {
  const [loginInput, setLoginInput] = useState({});

  const handleInput = (event) => {
    const name = event.target.name;
    const newValue = event.target.value;
    console.log(name, newValue);
    setLoginInput({
      ...loginInput,
      [name]: newValue,
    });
  };

  const handleSubmit = (event) => {};

  const setSignIn = (event) => {
    changeTab("signin");
  };

  return (
    <div className="d-flex flex-column ms-5">
      <div className="text-center">
        <img
          width={160}
          src="logo/ST_Stacked_RGB.png"
          alt="contributor1 profile"
          tabIndex={0}
        ></img>
        <h4 className="mt-1 mb-5 pb-1">We are The Supply Trace</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" direction="row" spacing={3}>
          <Grid item xs={6} className="wd-login-item">
            {
              <TextField
                fullWidth
                required
                aria-label="username text box"
                name="username"
                type="text"
                label="Username"
              />
            }
          </Grid>
          <Grid item xs={6} className="wd-login-item">
            {
              <TextField
                required
                fullWidth
                aria-label="email text box"
                name="email"
                label="Email"
                type="email"
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
              />
            }
          </Grid>
          <Grid item xs={6} className="wd-login-item">
            {
              <TextField
                required
                fullWidth
                aria-label="password text box"
                name="Re-type password"
                label="Re-type password"
                type="password"
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
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="d-flex flex-row align-items-center justify-content-center pb-4 mt-4">
        <p className="mb-0">Already have an account?</p>
        <MDBBtn outline className="mx-2" color="primary" onClick={setSignIn}>
          Sign in
        </MDBBtn>
      </div>
    </div>
  );
};

export default Register;
