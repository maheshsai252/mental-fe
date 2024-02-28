// PatientUpdatesPage.jsx
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { axiosRequest } from '../services/utils/axios';
import { API_BASE } from '../Constants';
import TherapySession from '../patient/session';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';

const PatientUpdatesPage = () => {
  const [updates, setMedicationPlans] = useState([]);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMedicationPlans = async () => {
      try {
        const response = await axiosRequest.get(`${API_BASE}/patient-updates/`);
        console.log(response.data);
        setMedicationPlans(response.data.data);
      } catch (error) {
        console.error('Error occurred while fetching medication plans:', error);
      }
    };

    fetchMedicationPlans();
  }, []);
  const sendAlert = async (status, update_id, patient) => {
    const res = {
        
        "need_attention": status!=="continue_medication",
        "continue_medication": status==='continue_medication',
        "patient": patient,
        "therapy_id": update_id,
    }
    console.log(res);
    const response = await axiosRequest.post(`${API_BASE}/create-alert/`,res);
    console.log(response)
  }
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  const handleLearnMoreClick = (therapy) => {
    setSelectedTherapy(therapy);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTherapy(null);
    setIsModalOpen(false);
  };

  return (
    <div className='ths'>
      <Typography variant="h4" gutterBottom>
        Patient Updates
      </Typography>
      {updates.length > 0 && updates.map((update) => (
        <Paper
          key={update.id}
          sx={{
            padding: '16px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Typography variant="h6" gutterBottom>
                <PersonIcon />
              {update.patient.username}
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Typography variant="body2" sx={{
              background: '#FFFBE6', // Yellowish background color
              padding: '15px',
              borderRadius: '14px',
              margin: '18px',
              minWidth: '80%'
            }}>
              {update.summary}
            </Typography>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            
            {!update.doctor_responded && (<>
            <Button
              color="success"
              style={{padding: '10px'}}
              onClick={() => {sendAlert('continue_medication', update.id, update.patient)}}
            >
             Continue
            </Button>
            <Button
              style={{padding: '10px'}}
              color="error"
              onClick={() => {sendAlert('attent', update.id, update.patient)}}
            >
              Need Attention
            </Button>
            </>)}

            {update.doctor_responded && (<>
                <Chip label="Responded" color='success'/>
            </> )}
            
            </div>
          </Box>
          <div style={{ marginTop:'1rem', display: 'flex', justifyContent: 'flex-start' }}>
          <Typography style={{ marginBottom: '8px', border: '3px solid black', borderRadius: '10px', padding: '5px' }}  variant="h6" gutterBottom>
                <EventIcon />
                {`Last Visited: ${new Date(update?.session?.session_date).toLocaleString(undefined, options)}`}
            </Typography>
            <Button
              color="primary"
              style={{marginLeft: '1rem'}}
              onClick={() => handleLearnMoreClick(update.session)}
            >
              Learn More
            </Button>
          </div>
        </Paper>
      ))}

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="therapy-session-modal"
        aria-describedby="therapy-session-description"
      >
      <div>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '90%',
          maxHeight: '80%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          overflowY: 'auto', 
          p: 4,
        }}>
          {selectedTherapy && <TherapySession session={selectedTherapy} />}
          <Button color='error' style={{display: 'flex', marginLeft : 'auto'  }} onClick={handleCloseModal}>Close</Button>
        </Box>
      </div>
        
      </Modal>
    </div>
  );
};

export default PatientUpdatesPage;
