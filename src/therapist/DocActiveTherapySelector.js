import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MedicationPlanCreation from '../patient/CreateMedicationPlan';
import { axiosRequest } from '../services/utils/axios';
import { API_BASE } from '../Constants';
const DOCActiveTherapiesSelector = () => {
  const [activeTherapies, setActiveTherapies] = useState([]);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    // Fetch active therapies from the API
    const fetchActiveTherapies = async () => {
      try {
        const response = await axiosRequest.get(`${API_BASE}/doc-therapy-sessions/`)
        console.log(response)
          setActiveTherapies(response.data);
               
      } catch (error) {
        console.error('Error occurred while fetching active therapies:', error);
      }
    };

    fetchActiveTherapies();
  }, []);

  const handleTherapyChange = (event) => {
    const therapyId = event.target.value;
    const selectedTherapy = activeTherapies.find((therapy) => therapy.id === parseInt(therapyId));
    setSelectedTherapy(selectedTherapy);
  };

  return (
    <div className='ths'>
     {!selectedTherapy && (<div><h2>Select Active Therapy</h2>
      <select onChange={handleTherapyChange}>
        <option value="">Select Therapy</option>
        {activeTherapies.map((therapy) => (
          <option key={therapy.id} value={therapy.id}>
            {therapy.therapist.username}
          </option>
        ))}
      </select></div>)}

      {selectedTherapy && (
        <div>
          <h3>Selected Therapy - Patient : {selectedTherapy.patient.username}</h3>
          <MedicationPlanCreation therapy={selectedTherapy} />
        </div>
      )}
    </div>
  );
};

export default DOCActiveTherapiesSelector;
