import { useContext } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';

import AuthContext from '../../shared/context/auth-context';

import classes from './Navigation.module.css';

const Navigation = () => {
  const { logout, isLoggedIn, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/auth', { replace: true });
  };

  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <>
            {isAdmin && (
              <li>
                <NavLink
                  className={navData =>
                    navData.isActive ? classes.active : ''
                  }
                  to="/add-doctor"
                >
                  Add Doctor
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                className={navData => (navData.isActive ? classes.active : '')}
                to="/appointments"
              >
                Appointments
              </NavLink>
            </li>

            <li>
              <NavLink
                className={navData => (navData.isActive ? classes.active : '')}
                to="/doctors"
              >
                Book Appointment
              </NavLink>
            </li>

            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <li>
            <div className={classes.button}>
              <Link to="/auth">
                <button>Login</button>
              </Link>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
