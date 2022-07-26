import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../shared/components/UI/Card';
import Button from '../../shared/components/FormElements/Button';

import AuthContext from '../../shared/context/auth-context';

import classes from './DoctorItem.module.css';

const DoctorItem = props => {
  const { imageUrl, name, speciality, experience } = props;

  const { isAdmin } = useContext(AuthContext);

  const navigate = useNavigate();

  const deleteDoctorHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/admin/doctors/${props.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  const redirectToEdit = () => {
    navigate(`/doctors/${props.id}`);
  };

  return (
    <li className={classes['list-item']}>
      <Card className={classes.card}>
        <div className={`${classes['image-container']} center`}>
          <img src={`http://localhost:8000/${imageUrl}`} alt={`Dr. ${name}`} />
        </div>

        <section className={classes['card-body']}>
          <h3>Dr. {name}</h3>

          <h4>Speciality:</h4>

          <span>{speciality}</span>

          <h4>Doctor experience:</h4>
          <p>{experience}</p>
        </section>

        <div className={classes['buttons-container']}>
          <div className={`${classes.booking} center`}>
            <Button onClick={props.onBook}>Book Appointment</Button>
          </div>

          {isAdmin && (
            <div className={`${classes.action} center`}>
              <Button inverse onClick={redirectToEdit}>
                Edit
              </Button>
              <Button danger onClick={deleteDoctorHandler}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </Card>
    </li>
  );
};

export default DoctorItem;
