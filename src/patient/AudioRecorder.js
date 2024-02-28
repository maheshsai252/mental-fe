import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { ReactMic } from 'react-mic';
import { axiosRequest } from '../services/utils/axios';
import { API_BASE } from '../Constants';

const AudioRecorder = ({ session }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = (recordedBlob) => {
    const audioUrl = URL.createObjectURL(recordedBlob.blob);
    setAudioURL(audioUrl);
    setAudioBlob(recordedBlob.blob);
    setIsRecording(false);
  };

  const handleUpload = async () => {
    if (!audioBlob) {
      alert("No audio to upload");
      return;
    }

    const audioArrayBuffer = await audioBlob.arrayBuffer();
    const audioData = new Uint8Array(audioArrayBuffer);

    try {
        const response = await axiosRequest.post(`${API_BASE}/upload-audio/`, audioData, {
            headers: {
              'Content-Type': 'application/octet-stream', // Set the appropriate content type
            },
            params: {
              therapy_id: session.id,
            },
          });
      console.log(response.data);
      alert("Audio uploaded successfully");
    } catch (error) {
      console.error('Error occurred while uploading audio:', error);
      alert("Error uploading audio");
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Session Recorder
      </Typography>
      <div style={{ textAlign: 'center', minWidth: '150px', margin: '10px' }}>
        <ReactMic
          record={isRecording}
          onStop={stopRecording}
          mimeType="audio/mp3"
          strokeColor="#000000"
          backgroundColor="violet"
        />
      </div>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button variant="contained" color="success" onClick={startRecording} disabled={isRecording}>
          Start Recording
        </Button>
        <Button variant="contained" color="error" onClick={() => setIsRecording(false)} disabled={!isRecording}>
          Stop Recording
        </Button>
        <Button variant="contained" color="primary" onClick={handleUpload} disabled={!audioURL}>
          Upload Audio
        </Button>
      </div>

      {audioURL && (
        <div style={{textAlign: 'center'}}>
        <audio controls style={{ marginTop: '20px' }}>
          <source src={audioURL} type="audio/mp3" />
        </audio>
        </div>
        
      )}
    </Container>
  );
};

export default AudioRecorder;
