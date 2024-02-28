import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Modal, Box, Paper, Typography, Button, Divider } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import WarningIcon from '@mui/icons-material/Warning';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { axiosRequest } from '../services/utils/axios';
import { API_BASE } from '../Constants';

const PatientAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axiosRequest.get(`${API_BASE}/get-alerts/`);
        console.log(response.data);
        setAlerts(response.data.data);
      } catch (error) {
        console.error('Error occurred while fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
  };

  const handleModalClose = () => {
    setSelectedAlert(null);
  };

  return (
    <div  style={{border: '3px solid black', borderRadius: '10px', margin: '10px', padding: '10px', background: '#FFFBE6'}}>
     <Typography style={{ textDecoration: 'underline' }} variant="h4" gutterBottom>
        Patient Alerts
      </Typography>
      <List>
        {alerts.map((alert) => (
          <ListItem key={alert.id} onClick={() => handleAlertClick(alert)}>
            {alert.continue_medication ? (
              <>
                <ListItemIcon>
                  <WarningIcon color="success" />
                </ListItemIcon>
                <ListItemText style={{ fontWeight: 'bold' }} primary={`Doctor ${alert.therapist.username} asked you to continue medication`} />
              </>
            ) : (
              <>
                <ListItemIcon>
                  <WarningIcon color="error" />
                </ListItemIcon>
                <ListItemText style={{ fontWeight: 'bold' }} primary={`Doctor ${alert.therapist.username} asked you to make an appointment`} />
              </>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PatientAlerts;
