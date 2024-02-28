import React from "react";
import { Typography } from '@mui/material';
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EventIcon from "@material-ui/icons/Event";
import PersonIcon from "@material-ui/icons/Person";
import {Chip} from "@mui/material";
const options = {
  // your date formatting options
};

const SessionInfo = ({ session }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px' }}>
      <div style={{ display: 'flex',  justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <PersonIcon style={{ marginRight: '7px' }} />
        <Typography variant="h5" color="textPrimary">
        {session.patient?.username}
        </Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <LocationOnIcon style={{ marginRight: '5px' }} />
        <Chip
          label={session.location === 'Online' ? 'Online' : `${session.location ?? "Online"}`}
          color={session.location === 'Online' ? 'default' : 'secondary'}
        />
        <div style={{ marginLeft:'1rem', display: 'flex', alignItems: 'flex-start', marginTop: '5px' }}>
        <EventIcon style={{ marginRight: '5px' }} />
        <Typography variant="body2" color="textSecondary">
          {new Date(session.session_date).toLocaleString(undefined, options)}
        </Typography>
      </div>
      </div>
      
    </div>
  </div>
);

export default SessionInfo;
