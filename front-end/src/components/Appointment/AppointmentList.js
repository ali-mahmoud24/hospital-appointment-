import { useState, useEffect, useContext } from 'react';

import AppointmentItem from './AppointmentItem';

import AuthContext from '../../shared/context/auth-context';

import classes from './AppointmentList.module.css';

const AppointmentsList = () => {
  const [loadedAppointments, setLoadedAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useContext(AuthContext);

  const appointmentDeletedHandler = deletedAppointmentId => {
    setLoadedAppointments(prevAppointments =>
      prevAppointments.filter(
        appointment => appointment.id !== deletedAppointmentId
      )
    );
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8000/appointments', {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await response.json();

        setIsLoading(false);

        console.log(data.appointments);
        setLoadedAppointments(data.appointments);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    fetchAppointments();
  }, [setLoadedAppointments]);

  if (loadedAppointments == null) return null;

  const appointmentsList = loadedAppointments.map(appointment => (
    <AppointmentItem
      key={appointment._id}
      id={appointment._id}
      doctorName={`${appointment.doctorId.firstname} ${appointment.doctorId?.secondname}`}
      speciality={appointment.doctorId.specialization}
      date={appointment.date}
      time={appointment.time}
      onDelete={appointmentDeletedHandler}
    />
  ));

  if (appointmentsList.length === 0) {
    return <h1>No Appointemnts found!</h1>;
  }

  return (
    <>{!isLoading && <ul className={classes.list}>{appointmentsList}</ul>}</>
  );
};

export default AppointmentsList;
