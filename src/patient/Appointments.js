import React from 'react';
import { Container, Typography, List, ListItem, Divider } from '@mui/material';
import CountdownTimer from './countdown';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { axiosRequest } from '../services/utils/axios';
import { API_BASE } from '../Constants';
import {Modal} from '@mui/material';
import TherapySession from './session';
import {Button} from '@mui/material';
import SessionInfo from './SessionInfo';
const UpcomingAppointmentsPage = () => {
    const [sessions, setSessions] = useState([]);
    const [selectedTherapy, setSelectedTherapy] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    useEffect(() => {
      const fetchSessions = async () => {
        try {
          const response = await axiosRequest.get(`${API_BASE}/patient-therapy-sessions/`);
          console.log(response.data);
          setSessions(response.data);
        } catch (error) {
          console.error('Error occurred while fetching sessions:', error);
        }
      };
  
      fetchSessions();
    }, []);
  
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  
    const handleSessionClick = (session) => {
      setSelectedTherapy(session);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setSelectedTherapy(null);
      setIsModalOpen(false);
    };

  return (
    <Container className='ths'>
      <Typography variant="h4" gutterBottom>
        Therapy Sessions
      </Typography>

      {sessions.length > 0 ? (
        <List>
          {sessions.map((session) => (
            <Box
              key={session.id}
              sx={{
                padding: '16px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <ListItem onClick={() => handleSessionClick(session)}>
                
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <SessionInfo session={session} />
                    <div style={{ marginLeft: 'auto' }}>
                    <CountdownTimer date={session.session_date} />
                    </div>
                </div>
              </ListItem>
            </Box>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No sessions.</Typography>
      )}

      {/* Modal for MedicationPlanCreation */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="medication-plan-creation-modal"
        aria-describedby="medication-plan-creation-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            width: '90%',  // Set a maximum width for the modal
            maxHeight: '90vh',  // Set a maximum height for the modal
            overflowY: 'auto',  // Make the content area scrollable

            p: 4,
          }}
        >
          {/* Pass selectedTherapy to MedicationPlanCreation component */}
          {selectedTherapy && (
            <div>
              {/* <Typography variant="h3" gutterBottom>
                Selected Therapy - Patient : {selectedTherapy.patient.username}
              </Typography> */}
              <TherapySession session={selectedTherapy} />
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button color='error' onClick={handleCloseModal}>Close</Button>
              </div>

            </div>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default UpcomingAppointmentsPage;
