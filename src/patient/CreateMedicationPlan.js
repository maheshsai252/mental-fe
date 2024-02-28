import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, Container } from '@mui/material';
import './index.css';
import AudioRecorder from './AudioRecorder';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const MedicationPlanCreation = ({therapy}) => {
  const [medicationPlan, setMedicationPlan] = useState({
    name: '',
    start_date: new Date(),
    end_date: new Date(),
    medications: [],
  });

  const [medicationSession, setMedicationSession] = useState({
    medicationDetails: {
      id: '',
      name: '',
      dosage: '',
      frequency: '',
      start_date: new Date(),
      end_date: new Date(),
      prescribed_for: '',
      side_effects: '',
    },
  });

  const [medicationSessions, setMedicationSessions] = useState([]);
  const [addSession, setAddSession] = useState(false);

  const handleMedicationSessionChange = (event) => {
    setMedicationSession({
      ...medicationSession,
      medicationDetails: {
        ...medicationSession.medicationDetails,
        [event.target.name]: event.target.value,
      },
    });
  };
  const navigate = useNavigate();

  const handleAddMedicationSession = () => {
    setMedicationSessions([...medicationSessions, { ...medicationSession }]);
    setAddSession(false);
  };

  const createMedicationPlan = async () => {
    // Implement the logic to send the medication plan to the backend
    try {
        medicationPlan.medications = medicationSessions;
        medicationPlan.therapy = therapy;
       
        // const response = await fetch(` https://mental-app-backend.onrender.com/api/create-medication/`, {

        const response = await fetch(`http://127.0.0.1:8000/api/create-medication/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(medicationPlan),
      });
      console.log(response);

        console.log('Medication plan created successfully');
        navigate('/doc-sessions');
    } catch (error) {
      console.error('Error occurred while creating medication plan:', error);
    }
  };

  const handleMedicationPlanChange = (event) => {
    setMedicationPlan({
      ...medicationPlan,
      [event.target.name]: event.target.value,
    });
  };
  const FREQUENCY_CHOICES = [
    { value: 'all_day', label: 'All Day' },
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
  ];
  const handleMedicationDetailChange = (field, value) => {
    setMedicationSession({
      ...medicationSession,
      medicationDetails: {
        ...medicationSession.medicationDetails,
        [field]: value,
      },
    });
  };
console.log(FREQUENCY_CHOICES)
  return (
    <Container className='ths'>
        <AudioRecorder session={therapy} />
      <Typography style={{marginTop: '5rem'}} variant='h5' align='center'>Create Medication Plan</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Plan Name'
            name='name'
            value={medicationPlan.name}
            onChange={handleMedicationPlanChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type='date'
            label='Start Date'
            name='start_date'
            value={medicationPlan.start_date}
            onChange={handleMedicationPlanChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type='date'
            label='End Date'
            name='end_date'
            value={medicationPlan.end_date}
            onChange={handleMedicationPlanChange}
          />
        </Grid>
      </Grid>
      <div style={{marginTop:'1rem', display: 'flex', justifyContent: 'space-between'}}>
        <h3>Medications</h3>
        {addSession}
        <Button variant='contained' color='secondary' onClick={() => {setAddSession(true);}}>
            Add Medication
      </Button>
      </div>
    <div>
    {medicationSessions.length === 0 ? <p style={{textAlign: 'center'}}><strong > No Medications</strong> </p> : (
        <Container>
          <ul>
            {medicationSessions.map((session, index) => (
              <li key={index}>
                <h5>{session.medicationDetails.name}</h5>
                <p>Dosage: {session.medicationDetails.dosage}</p>
                <p>Frequency: {session.medicationDetails.frequency}</p>
                <p>Start Date: {session.medicationDetails.start_date}</p>
                {session.medicationDetails.end_date && (
                  <p>End Date: {session.medicationDetails.end_date}</p>
                )}
                {/* <p>Prescribed For: {session.medicationDetails.prescribed_for}</p>
                {session.medicationDetails.side_effects && (
                  <p>Side Effects: {session.medicationDetails.side_effects}</p>
                )} */}
              </li>
            ))}
          </ul>
        </Container>
      )}
    </div>

      {addSession && (
        <Container style={{margin:'3rem', border: '1px solid purple', borderRadius: '10px'}}>
          <Typography align='center' variant='h6'>Create Medication</Typography>

          <Grid style={{marginTop: '1rem'}} container spacing={2}>

            {/* Medication Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Medication Name'
                name='name'
                value={medicationSession.medicationDetails.name}
                onChange={(e) => handleMedicationDetailChange('name', e.target.value)}
              />
            </Grid>

            {/* Medication Dosage */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Dosage'
                name='dosage'
                value={medicationSession.medicationDetails.dosage}
                onChange={(e) => handleMedicationDetailChange('dosage', e.target.value)}
              />
            </Grid>

            {/* Medication Frequency */}
            <Grid item xs={12}>
             

                <TextField
                fullWidth
                select
                label='Frequency'
                name='frequency'
                value={medicationSession.medicationDetails.frequency}
                onChange={(e) => handleMedicationDetailChange('frequency', e.target.value)}
                >
                {FREQUENCY_CHOICES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
            </Grid>

            {/* Medication Start Date */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                type='date'
                label='Start Date'
                name='start_date'
                InputProps={{
                    inputProps: { min: medicationPlan.start_date, max: medicationPlan.end_date}, // Set your desired start and end dates
                }}
                value={medicationSession.medicationDetails.start_date}
                onChange={(e) => handleMedicationDetailChange('start_date', e.target.value)}
              />
            </Grid>

            {/* Medication End Date */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                type='date'
                label='End Date'
                name='end_date'
                InputProps={{
                    inputProps: { min: medicationPlan.start_date, max: medicationPlan.end_date}, // Set your desired start and end dates
                }}
                value={medicationSession.medicationDetails.end_date}
                onChange={(e) => handleMedicationDetailChange('end_date', e.target.value)}
              />
            </Grid>

            {/* Medication Prescribed For */}
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label='Prescribed For'
                name='prescribed_for'
                value={medicationSession.medicationDetails.prescribed_for}
                onChange={(e) => handleMedicationDetailChange('prescribed_for', e.target.value)}
              />
            </Grid> */}

            {/* Medication Side Effects */}
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label='Side Effects'
                name='side_effects'
                value={medicationSession.medicationDetails.side_effects}
                onChange={(e) => handleMedicationDetailChange('side_effects', e.target.value)}
              />
            </Grid>
           
             */}
          </Grid>
          <div style={{margin:'1rem', textAlign: 'center', display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button variant='contained' color='error' onClick={() => setAddSession(false)}>
              Cancel
            </Button> 

            <Button variant='contained' color='primary' onClick={handleAddMedicationSession}>
              Add Medication Session
            </Button>

            </div>
        </Container>
      )}

      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

      <Button style={{marginLeft: 'auto'}} variant='contained' color='primary' onClick={createMedicationPlan}>
        Create Plan
      </Button>
      </div>
    </Container>
  );
};

export default MedicationPlanCreation;
