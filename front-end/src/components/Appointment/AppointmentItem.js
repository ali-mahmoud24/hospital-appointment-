import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../shared/components/UI/Card';
import Button from '../../shared/components/FormElements/Button';

import AuthContext from '../../shared/context/auth-context';

import classes from './AppointmentItem.module.css';

const AppointmentItem = props => {
  const { id: appointmentId, doctorName, speciality, date, time } = props;

  const { isAdmin } = useContext(AuthContext);

  // const navigate = useNavigate();

  const deleteDoctorHandler = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/admin/delete-appointment/${appointmentId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      console.log(res);
      const data = res.json();
      console.log(data);
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li>
      <Card className={classes.card}>
        <h3>Dr. {doctorName}</h3>

        <h4>Speciality:</h4>

        <span>{speciality}</span>

        <div className={`${classes.time}`}>
          <div>
            <h3>Date: </h3>
            <h4>{date}</h4>
          </div>
          <div>
            <h3>Time: </h3>
            <h4>{time}</h4>
          </div>
        </div>

        {isAdmin && (
          <div className={`${classes.action} center`}>
            {/* <Button inverse>
              Edit
            </Button> */}
            <Button danger onClick={deleteDoctorHandler}>
              Delete
            </Button>
          </div>
        )}
      </Card>
    </li>
  );
};

export default AppointmentItem;
