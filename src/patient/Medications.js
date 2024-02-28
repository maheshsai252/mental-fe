import React, { useState, useEffect } from 'react';
import { List,
    ListItem,
    ListItemIcon,
    ListItemText, Modal, Box, Paper, Typography, Button, Divider } from '@mui/material';
import MedicationPlan from './MedicationPlan';
import { axiosRequest } from '../services/utils/axios';
import { API_BASE } from '../Constants';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';

const PatientMedicationPlanList = () => {
  const [medicationPlans, setMedicationPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchMedicationPlans = async () => {
      try {
        const response = await axiosRequest.get(`${API_BASE}/patient-medications/`);
        console.log(response.data);
        setMedicationPlans(response.data);
      } catch (error) {
        console.error('Error occurred while fetching medication plans:', error);
      }
    };

    fetchMedicationPlans();
  }, []);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div >
      <h2>Medication Plans</h2>
      <List>
          {medicationPlans.map((plan) => (
            <Box
              sx={{
                padding: '1rem',
                bgcolor: 'background.paper',
                margin: '1rem',
            // border: '2px solid #000',
                boxShadow: 24,
                }}
             key={plan.id} button onClick={() => handlePlanClick(plan)}>
              <div style={{marginBottom:'10px', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1"><h4>{plan.name || 'Plan'}</h4></Typography>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <ListItemIcon>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <EventIcon />
                    <Typography variant="body2" style={{ marginLeft: '0.5rem' }}>
                    {plan.start_date}
                    </Typography>
                </Box>
               
                <Box display="flex" flexDirection="row" alignItems="center" marginLeft={1}>
                    <EventIcon />
                    <Typography variant="body2" style={{ marginLeft: '0.5rem' }}>
                    {plan.end_date}
                    </Typography>
                </Box>
                </ListItemIcon>
                <ListItemIcon>
                  <PersonIcon />
                  <Typography variant="body2">{plan.therapist.username}</Typography>
                </ListItemIcon>
              </div>
            </Box>
          ))}
        </List>
      <Modal
       open={isModalOpen} onClose={handleCloseModal}>
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
          <Paper sx={{ padding: 2, minWidth: 300 }}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button color='error' onClick={handleCloseModal}>Close</Button>
            </div>
            <Typography variant="h5">Medication Plan Details</Typography>
            {selectedPlan && <MedicationPlan plan={selectedPlan} setSelectedPlan={setSelectedPlan} />}
          </Paper>
        </Box>
      </Modal>
    </div>
  );
};

export default PatientMedicationPlanList;
