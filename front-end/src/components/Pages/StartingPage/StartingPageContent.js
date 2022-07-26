import Button from '../../../shared/components/FormElements/Button';

import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  return (
    <>
      <section className={`${classes.starting} center`}>
        <h1>Welcome to Morningside Clinic!</h1>
      </section>
      <div className={`${classes.actions} center`}>
        <Button to="/doctors">Book Appointment!</Button>
      </div>
    </>
  );
};

export default StartingPageContent;
