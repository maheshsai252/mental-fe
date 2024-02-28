import React, { useState, useEffect } from 'react';
import './index.css'
import MedicationPlan from './MedicationPlan';
const TherapySessionList = () => {
  const [therapySessions, setTherapySessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    // Fetch therapy sessions from the API
    const fetchTherapySessions = async () => {
    //   try {
        // const response = await fetch('YOUR_API_ENDPOINT/therapy-sessions/');
        // if (response.ok) {
        //   const data = await response.json();
        const data = [
            {
              "id": 1,
              "therapist": "TherapistA",
              "patient": "PatientA",
              "session_date": "2023-03-01T10:00:00Z",
              "medication_plan": [
                {
                  "id": 1,
                  "name": "Medication Plan 1"
                },
                {
                  "id": 2,
                  "name": "Medication Plan 2"
                }
              ],
              "therapist_transcription": "Therapist's transcription for Session 1",
              "patient_transcription": "Patient's transcription for Session 1"
            },
            {
              "id": 2,
              "therapist": "TherapistB",
              "patient": "PatientB",
              "session_date": "2023-03-15T14:30:00Z",
              "medication_plan": [
                {
                  "id": 3,
                  "name": "Medication Plan 3"
                }
              ],
              "therapist_transcription": "Therapist's transcription for Session 2",
              "patient_transcription": "Patient's transcription for Session 2"
            },
            {
              "id": 3,
              "therapist": "TherapistC",
              "patient": "PatientC",
              "session_date": "2023-03-20T11:45:00Z",
              "medication_plan": [
                {
                  "id": 1,
                  "name": "Medication Plan 1"
                },
                {
                  "id": 3,
                  "name": "Medication Plan 3"
                }
              ],
              "therapist_transcription": "Therapist's transcription for Session 3",
              "patient_transcription": "Patient's transcription for Session 3"
            }
          ]
          
          setTherapySessions(data);
    //     } else {
    //       console.error('Failed to fetch therapy sessions');
    //     }
    //   } catch (error) {
    //     console.error('Error occurred while fetching therapy sessions:', error);
    //   }
    };

    fetchTherapySessions();
  }, []);

  const handleSessionClick = (session) => {
    setSelectedSession(session);
  };

  const handleBackButtonClick = () => {
    setSelectedSession(null);
  };

  return (
    <div className='ths'>
      <h2>Therapy Sessions</h2>
      {selectedSession ? (
        <TherapySession session={selectedSession} onBackButtonClick={handleBackButtonClick} />
      ) : (
        <ul>
          {therapySessions.map((session) => (
            <li key={session.id} onClick={() => handleSessionClick(session)}>
              Session on {session.session_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TherapySession = ({ session }) => {
  return (
    <div>
      {/* <button onClick={onBackButtonClick}>Back</button> */}
      <h3>Therapy Session</h3>
      <p>Date: {session.session_date}</p>
      <h4>Medication Plan</h4>
      <ul>
        {session.medication_plan.map((medPlan) => (
          <MedicationPlan plan={medPlan} />
        ))}
      </ul>
      <p>Therapist Transcription: {session.therapist_transcription}</p>
      <p>Patient Transcription: {session.patient_transcription}</p>
    </div>
  );
};

export default TherapySession;
