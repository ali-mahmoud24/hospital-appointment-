import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../shared/components/UI/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import useForm from '../../shared/hooks/use-form';

import AuthContext from '../../shared/context/auth-context';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validators';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchAuthModeHandler = () => {
    setIsLoginMode(prevState => !prevState);
  };

  const formSubmitHandler = async event => {
    event.preventDefault();

    if (!formState.isValid) {
      return;
    }

    if (isLoginMode) {
      try {
        const loginResponse = await fetch('http://localhost:8000/login', {
          method: 'POST',
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const loginData = await loginResponse.json();

        auth.login(loginData.userId, loginData.token, null, loginData.isAdmin);

        navigate('/doctors', { replace: true });
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        const signupResponse = await fetch('http://localhost:8000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const signupData = await signupResponse.json();
        auth.login(
          signupData.userId,
          signupData.token,
          null,
          signupData.isAdmin
        );

        navigate('/doctors', { replace: true });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Card className={classes.authentication}>
      <h2>{isLoginMode ? 'Login Required' : 'Sign Up'}</h2>
      <hr />
      <form onSubmit={formSubmitHandler}>
        <Input
          element="input"
          id="email"
          type="email"
          label="Your E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorMessage="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Your Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorMessage="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>

      <div className={classes.toggle}>
        <Button inverse onClick={switchAuthModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </div>
    </Card>
  );
};

export default AuthForm;
