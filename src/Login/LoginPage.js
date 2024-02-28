import { useState } from "react";

import './login.css';

import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import Signin from "./Signin";

import Register from "./Register";

const Login = ({ setIsAuthenticated }) => {
  const [tab, setTab] = useState("signin");

  return (
    <div className="gradient-form login-full-size">
      <MDBRow className="al-center">
        <MDBCol col="6" className="">
          {tab === "signin" ? (
            <Signin
              setIsAuthenticated={setIsAuthenticated}
              changeTab={setTab}
            />
          ) : (
            <Register changeTab={setTab}></Register>
          )}
        </MDBCol>

        <MDBCol col="6" className="login-full-height">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">We are more than just a company</h4>
              <p class="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Login;
