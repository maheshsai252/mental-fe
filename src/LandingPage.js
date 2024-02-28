import { useEffect, useState } from "react";
import PatientHomepage from "./patient/TherapistHomepage";
import DoctorHomepage from "./therapist/DoctorHomepage";
import { getUser } from "./services/login-service";
import CircularProgress from '@mui/material/CircularProgress';
import Signin from "./Login/Signin";
function LandingPage() {
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    const get = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    get();
  }, []);

  return (
    <>
    {
        !currentUser && (
            <CircularProgress />
        )
    }
      {currentUser && currentUser.role === 'patient' && (
        <PatientHomepage patient={currentUser} />
      )}
      {currentUser && currentUser.role === 'doctor' && (
        <DoctorHomepage />
      )}
    </>
  );
}

export default LandingPage;
