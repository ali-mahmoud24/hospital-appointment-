import { useState, useEffect, useContext } from 'react';

import DoctorItem from './DoctorItem';
import AppointmentForm from '../Appointment/AppointmentForm';
import AuthContext from '../../shared/context/auth-context';

import classes from './DoctorList.module.css';

const DoctorsList = () => {
  const [loadedDoctors, setLoadedDoctors] = useState([]);
  const [currentDoctorId, setCurrentDoctorId] = useState(null);

  const { token } = useContext(AuthContext);

  const doctorDeletedHandler = deletedDoctorId => {
    setLoadedDoctors(prevDoctors =>
      prevDoctors.filter(doctor => doctor.id !== deletedDoctorId)
    );
  };

  const onBookHandler = currentDoctorId => {
    setCurrentDoctorId(currentDoctorId);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await fetch('http://localhost:8000/doctors', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await response.json();
      setLoadedDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const doctorsList = loadedDoctors.map(doctor => (
    <DoctorItem
      key={doctor._id}
      id={doctor._id}
      imageUrl={doctor.image}
      name={`${doctor.firstname} ${doctor.secondname}`}
      speciality={doctor.specialization}
      experience={doctor.experience}
      onDelete={doctorDeletedHandler}
      onBook={() => onBookHandler(doctor._id)}
    />
  ));

  if (doctorsList.length === 0) {
    return <h1>No Doctors found!</h1>;
  }

  return (
    <>
      {currentDoctorId && (
        <AppointmentForm
          doctorId={currentDoctorId}
          onClose={() => setCurrentDoctorId(null)}
        />
      )}
      <ul className={classes.list}>{doctorsList}</ul>
    </>
  );
};

export default DoctorsList;
