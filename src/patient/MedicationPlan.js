import React, { useEffect, useState } from "react";
import {    ListItemIcon,
    Divider, Button, List, ListItem, Typography, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { axiosRequest } from "../services/utils/axios";
import { API_BASE } from "../Constants";
import EventIcon from "@mui/icons-material/Event";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PersonIcon from "@mui/icons-material/Person";
import WarningIcon from "@mui/icons-material/Warning";

const MedicationPlan = ({ plan, setSelectedPlan }) => {
  const handleBackButtonClick = () => {
    setSelectedPlan(null);
  };
  const [medicationLogs, setMedicationLogs] = useState([]);

  useEffect(() => {
    const fetchMedicationLogs = async () => {
      try {
        const response = await axiosRequest.get(`${API_BASE}/mood-logs/${plan.id}/`);
        console.log(response.data);
        setMedicationLogs(response.data);
      } catch (error) {
        console.error("Error occurred while fetching medication logs:", error);
      }
    };

    fetchMedicationLogs();
  }, [plan.id]);

  return (
    <Paper style={{ padding: "16px", maxWidth: "100%", margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        #{plan.name ?? "Plan"}
      </Typography>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <EventIcon fontSize="small" style={{ marginRight: "8px" }} />
        <Typography variant="subtitle1">Start Date: {plan.start_date}</Typography>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <EventIcon fontSize="small" style={{ marginRight: "8px" }} />
        <Typography variant="subtitle1">End Date: {plan.end_date}</Typography>
      </div>
      <Typography variant="h5" gutterBottom>
        Medications
      </Typography>
      <List>
        {plan.medications?.map((medication) => (
          <ListItem key={medication.id}>
            <Medication medication={medication} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" gutterBottom>
        Mood Logs for Medication Plan ID: {plan.id}
      </Typography>
      <List>
        {medicationLogs.map((moodLog) => (
          <ListItem key={moodLog.id}>
            <div>
              <Typography variant="body1">QA: {moodLog.qa}</Typography>
              <Typography variant="body1">Medication Followed: {moodLog.medication_followed}</Typography>
              {/* Add more details based on your model */}
            </div>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};


  
const Medication = ({ medication }) => {
    return (
      <ListItem>
        <ListItemIcon>
          <LocalHospitalIcon />
        </ListItemIcon>
        <div style={{ width: "100%" }}>
          <Typography variant="h5">{medication.name}</Typography>
          <div style={{width:'70%',display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography variant="body1">
                <ScheduleIcon /> Dosage: {medication.dosage}
            </Typography>
            <Typography variant="body1">
            <EventIcon /> Frequency: {medication.frequency}
          </Typography>
         </div>
          
          <div style={{width:'70%', display:'flex', flexDirection: 'row',  justifyContent: 'space-between'}}>
                <Typography variant="body1">
                    <EventIcon /> {medication.start_date}
                </Typography>
                {medication.end_date && (
                    <Typography variant="body1">
                        <EventIcon style={{marginLeft: '10px'}} />{medication.end_date}
                    </Typography>
                )}
          </div>
          
          
          {/* <Typography variant="body1">
            <PersonIcon /> Prescribed For: {medication.prescribed_for}
          </Typography> */}
          {medication.side_effects && (
            <Typography variant="body1">
              <WarningIcon /> Side Effects: {medication.side_effects}
            </Typography>
          )}
        </div>
        <Divider />
      </ListItem>
    );
  };
  
  export default MedicationPlan;