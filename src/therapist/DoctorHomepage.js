import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import './index.css';
import { getUser } from '../services/login-service';
import OngoingSessionsPage from './ongoing-sessions';
const DoctorHomepage = () => {
    const [ currentUser, setUser ] = useState(null);
  useEffect(()=>  {
    const get = async () => {
      const userData = await getUser();
      setUser(userData)
    }
    get()
  }, [])
  const [greeting, setGreeting] = useState('');
  
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
        {greeting}, Dr. {currentUser?.username ?? "Mahesh"}!
        
    </Typography>
    <Typography variant="h4" gutterBottom style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
        You have 4 appointments left to complete today
    </Typography>

    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
    
        <Button style={{border: '2px solid black', borderRadius: '10px', margin: '10px'}} color="primary" fullWidth  component={Link} to="/upcoming-sessions">
           Sessions
        </Button>
        <Button style={{border: '2px solid black', borderRadius: '10px', margin: '10px'}} color="primary" fullWidth component={Link} to="/patient-updates">
          Patient Updates
        </Button>
    </div>
    <OngoingSessionsPage />
  </Container>
  );
};

export default DoctorHomepage;
