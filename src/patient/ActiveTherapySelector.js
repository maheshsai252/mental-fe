import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MedicationForm from './LogDetails';
import { API_BASE } from '../Constants';
import { axiosRequest } from '../services/utils/axios';
import {Box, Modal} from '@mui/material';
import {
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import SessionInfo from './SessionInfo';

const ActiveTherapiesSelector = () => {
  const [activeTherapies, setActiveTherapies] = useState([]);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchActiveTherapies = async () => {
      try {
        const response = await axiosRequest.get(`${API_BASE}/patient-medications/`);
        console.log(response);
        setActiveTherapies(response.data);
      } catch (error) {
        console.error('Error occurred while fetching active therapies:', error);
      }
    };

    fetchActiveTherapies();
  }, []);

  const handleTherapyClick = (therapy) => {
    setSelectedTherapy(therapy);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='ths'>
      <h2>Select Active Therapy</h2>
      <List>
        {activeTherapies.map((therapy) => (
          <ListItem key={therapy.id} button onClick={() => handleTherapyClick(therapy)}>
            <SessionInfo session={therapy} />
          </ListItem>
        ))}
      </List>

      <Modal style={{
        width: '90%'
      }} open={isModalOpen} onClose={handleCloseModal}>
        <div>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '1rem',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            width: '95%',  // Set a maximum width for the modal
            height: '90%',
            maxHeight: '90vh',  // Set a maximum height for the modal
            overflowY: 'auto',  // Make the content area scrollable
            p: 4,
          }}
        >
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button color='error' onClick={handleCloseModal}>Close</Button>
              </div>
            
            {selectedTherapy && <MedicationForm plan={selectedTherapy} />}

        </Box>
        
        </div>
          
      </Modal>
    </div>
  );
};

export default ActiveTherapiesSelector;
