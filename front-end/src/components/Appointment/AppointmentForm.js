import { useContext, useState } from 'react';

import Modal from '../../shared/components/UI/Modal';
import Card from '../../shared/components/UI/Card';

import AuthContext from '../../shared/context/auth-context';

import DateTimePicker from 'react-datetime-picker';

import classes from './AppointmentForm.module.css';

const AppointmentForm = ({ doctorId, onClose }) => {
  const [time, setTime] = useState(new Date());
  const { userId, token } = useContext(AuthContext);

  const addAppointmetHandler = async event => {
    event.preventDefault();

    try {
      await fetch('http://localhost:8000/add-appointment', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ time, userId, doctorId }),
      });

      onClose();
    } catch (err) {}
  };

  return (
    <Modal onClose={onClose}>
      <Card className={classes.card}>
        <h2>Please choose appointment's date and time: </h2>
        <form onSubmit={addAppointmetHandler}>
          <div className="center">
            <DateTimePicker onChange={setTime} value={time} />
          </div>

          <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={onClose}>
              Close
            </button>
            <button type="submit" className={classes.button}>
              Book Appointment
            </button>
          </div>
        </form>
      </Card>
    </Modal>
  );
};

export default AppointmentForm;
