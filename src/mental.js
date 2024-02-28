import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Login/LoginPage';
import './index.css';
import DoctorHomepage from './therapist/DoctorHomepage';
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserThunk } from './services/user-thunk';
import Register from './Login/Register';
import NavbarComponent from './NavbarComponent';
import UpcomingSessionsPage from './therapist/upcoming-sessions';
import PatientUpdatesPage from './therapist/PatientUpdates';
import PatientHomepage from './patient/TherapistHomepage';
import UpcomingAppointmentsPage from './patient/Appointments';
import MedicationForm from './patient/LogDetails';
import PatientMedicationPlanList from './patient/Medications';
import TherapySessionList from './patient/session';
import MedicationPlanCreation from './patient/CreateMedicationPlan';
import DOCActiveTherapiesSelector from './therapist/DocActiveTherapySelector';
import ActiveTherapiesSelector from './patient/ActiveTherapySelector';
import OngoingSessionsPage from './therapist/ongoing-sessions';
import LandingPage from './LandingPage';
import Signin from './Login/Signin';
const Mental = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const { currentUser, loading: userLoading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!userLoading) {
      if (currentUser) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [currentUser, userLoading]);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("user fetched again");
    dispatch(getUserThunk());
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
       
        <main role="main">
          <div className="main-container">
            <Routes>
              <Route
                path="/login"
                element={<Signin setIsAuthenticated={setIsAuthenticated} />}
              />

              <Route
                path="/register"
                element={<Register setIsAuthenticated={setIsAuthenticated} />}
              />
            <Route
                path="/doc-sessions"
                element={
                    <div>
                        <NavbarComponent />
                        <UpcomingSessionsPage />
                    </div>
                }
              />
            <Route
                path="/"
                element={
                    <div>
                        <NavbarComponent />
                        <LandingPage />
                    </div>
                
                }
              />
              <Route
                path="/patient-updates"
                element={
                    <div>
                        <NavbarComponent />
                        <PatientUpdatesPage />
                    </div>
                
                }
              />
              <Route
                path="/patient-log-mood"
                element={
                    <div>
                        <NavbarComponent />
                        <ActiveTherapiesSelector />
                    </div>
                
                }
              />
              <Route
                path="/patient-homepage"
                element={
                    <div>
                        <NavbarComponent />
                        <PatientHomepage />
                    </div>
                }
              />
              <Route
                path="/upcoming-appointments"
                element={
                    <div>
                        <NavbarComponent />
                        <UpcomingAppointmentsPage />
                    </div>
                }
              />
               <Route
                path="/log-update"
                element={
                    <div>
                        <NavbarComponent />
                        <MedicationForm />
                    </div>
                }
              />
              <Route
                path="/patient-medications"
                element={
                    <div>
                        <NavbarComponent />
                        <PatientMedicationPlanList />
                    </div>
                }
              />
              <Route
                path="/sessions"
                element={
                    <div>
                        <NavbarComponent />
                        <TherapySessionList />
                    </div>
                }
              />
              <Route
                path="/ongoing-sessions"
                element={
                    <div>
                        <NavbarComponent />
                        <OngoingSessionsPage />
                    </div>
                }
              />
              {/* <Route
                path="/create-plan"
                element={
                    <div>
                        <NavbarComponent />
                        <MedicationPlanCreation />
                    </div>
                }
              /> */}
              <Route
                path="/create-plan"
                element={
                    <div>
                        <NavbarComponent />
                        <DOCActiveTherapiesSelector />
                    </div>
                }
              />
              
            </Routes>
            
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default Mental;
