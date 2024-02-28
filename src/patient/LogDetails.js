import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  InputLabel,
  Input,
  Button,
  TextField,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
} from '@mui/material';
import './index.css';
import { axiosRequest } from '../services/utils/axios';
import { API_BASE } from '../Constants';

const MedicationForm = ({ plan }) => {
  const [medications, setMedications] = useState(plan.medications);
  const [questions, setQuestions] = useState([
    'How often do you take this medication?',
    'Have you experienced any side effects?',
    // Add more questions as needed
  ]);
  const [currentMedicationIndex, setCurrentMedicationIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [medicationAnswers, setMedicationAnswers] = useState({});
  const [questionAnswers, setQuestionAnswers] = useState([]);

  const handleCheckboxChange = (medicationId) => {
    setMedicationAnswers((prevAnswers) => ({
      ...prevAnswers,
      [medicationId]: !prevAnswers[medicationId],
    }));
  };

  const handleTextAnswerChange = (event) => {
    setQuestionAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = {
        question: questions[currentQuestionIndex],
        answer: event.target.value,
      };
      return updatedAnswers;
    });
  };

  const handleNextMedication = () => {
    setCurrentMedicationIndex(currentMedicationIndex + 1);
  };

  const handlePrevMedication = () => {
    setCurrentMedicationIndex(currentMedicationIndex - 1);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmit = async () => {
    // Combine medication and question answers and send to the backend
    const formSubmission = {
      medicationAnswers,
      questionAnswers,
    };

    // Send the formSubmission object to the backend
    try {
      const formattedMedicationAnswers = Object.entries(medicationAnswers).map(([medicationId, status]) => ({
        name: medications.find((medication) => medication.id === parseInt(medicationId, 10)).name,
        status: status ? 'Followed' : 'Not Followed',
      }));
      const formattedMedicationString = formattedMedicationAnswers.map((medication) => (
        `medication: ${medication.name}\nstatus: ${medication.status}`
      )).join('\n\n');
      // Convert questionAnswers to an array of objects with question and answer
      const formattedQuestionAnswers = questionAnswers.map((answer) => ({
        question: answer.question,
        answer: answer.answer,
      }));

      const formattedQuestionString = formattedQuestionAnswers.map((answer) => (
        `question: ${answer.question}\nans: ${answer.answer}`
      )).join('\n\n');
      const response = await axiosRequest.post(`${API_BASE}/create-mood-log/`, JSON.stringify({
        qa: formattedQuestionString,
        medication_followed: formattedMedicationString,
        medication_plan: plan.id,
      }));

      console.log(response);
    } catch (error) {
      console.error('Error occurred while sending form data:', error);
    }
  };

  return (
    <div className='ths'>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <div style={{padding: '2rem'}}>
              <h2>Medication Details</h2>
              {medications.map((medication, index) => (
                <FormControlLabel
                  key={medication.id}
                  control={
                    <Checkbox
                      checked={medicationAnswers[medication.id] || false}
                      onChange={() => handleCheckboxChange(medication.id)}
                    />
                  }
                  label={
                    <>
                      {medication.name}
                    </>
                  }
                />
              ))}
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Card>
              <CardHeader title={`Question ${currentQuestionIndex + 1}`} />
              <CardContent>
                <Typography variant="h6">{questions[currentQuestionIndex]}</Typography>
                <TextField
                  label="Answer"
                  variant="outlined"
                  fullWidth
                  value={questionAnswers[currentQuestionIndex]?.answer || ''}
                  onChange={handleTextAnswerChange}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous Question
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next Question
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>

      <div style={{marginTop:'3rem', display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Button variant="contained" onClick={handleSubmit}>
            Submit
        </Button>
      </div>
    </div>
  );
};

export default MedicationForm;
