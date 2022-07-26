import { Link } from 'react-router-dom';

import Navigation from './Navigation';

import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <h1>
        <Link to="/welcome">Morningside Clinic</Link>
      </h1>

      <Navigation />
    </header>
  );
};

export default MainHeader;
