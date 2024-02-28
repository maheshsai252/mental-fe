import React, { useState } from 'react';
import { Container, Typography, List, ListItem, Box, Modal, Button } from '@mui/material';
import CountdownTimer from './countdown';
import Chip from '@mui/material/Chip';
import { useEffect } from 'react';
import { API_BASE } from '../Constants';
import { axiosRequest } from '../services/utils/axios';
import MedicationPlanCreation from '../patient/CreateMedicationPlan';
const OngoingSessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axiosRequest.get(`${API_BASE}/doc-therapy-sessions/`);
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
        Today's Sessions
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
              <ListItem button onClick={() => handleSessionClick(session)}>
                <div style={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {new Date(session.session_date).toLocaleString(undefined, options)}
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px' }}>
                    <Chip label={session.patient?.username} color="primary" style={{ marginRight: '10px' }} />
                    <Chip
                      label={session.location === 'Online' ? 'Online' : `Venue: ${session.location ?? "Online"}`}
                      color={session.location === 'Online' ? 'default' : 'secondary'}
                    />
                  </div>
                </div>
                <div>
                  <CountdownTimer date={session.session_date} />
                </div>
              </ListItem>
            </Box>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No Ongoing sessions.</Typography>
      )}

      {/* Modal for MedicationPlanCreation */}
      <Modal
        open={isModalOpen}
        className='ths'
        onClose={handleCloseModal}
        aria-labelledby="medication-plan-creation-modal"
        aria-describedby="medication-plan-creation-description"
      >
        <div>
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
        <Button style={{position: 'fixed'}} onClick={handleCloseModal} color='primary'>END SESSION</Button>

          {selectedTherapy && (
            <div style={{width : '90%'}}>
              <MedicationPlanCreation therapy={selectedTherapy} />
            </div>
          )}
        </Box>
        </div>
        

      </Modal>
    </Container>
  );
};

export default OngoingSessionsPage;
