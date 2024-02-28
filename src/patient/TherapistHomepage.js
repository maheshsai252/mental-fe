import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getUserThunk } from '../services/user-thunk';
import './index.css';
import PatientMedicationPlanList from './Medications';
import PatientAlerts from './PatientAlerts';
const PatientHomepage = ({patient}) => {
  const [greeting, setGreeting] = useState('');
  
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("user fetched again");
    dispatch(getUserThunk());
  }, []);
  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 6 && currentTime < 12) {
      setGreeting('Good Morning');
    } else if (currentTime >= 12 && currentTime < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <Container className='ths'>
    <Typography variant="h3" gutterBottom style={{ fontFamily: 'italic', fontWeight: 'bold' }}>
        {greeting}, {patient?.username ?? "Mahesh"}!
        
    </Typography>
    <Typography variant="h4" gutterBottom style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
        You have 4 medications to complete today
    </Typography>
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
    
    <Button style={{border: '2px solid black', borderRadius: '10px', margin: '10px'}} color="primary" fullWidth component={Link} to="/upcoming-appointments">
      Sessions
    </Button>
    <Button style={{border: '2px solid black', borderRadius: '10px', margin: '10px'}} color="primary" fullWidth component={Link} to="/patient-log-mood">
      Log Health
    </Button>
    </div>
    
    <PatientAlerts />
    <PatientMedicationPlanList />
  </Container>
  );
};

export default PatientHomepage;
