import { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './Auth.css';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginModal, setIsLoginModal] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
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
  const switchModalHandler = () => {
    if (!isLoginModal) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: '', isValid: false } },
        false
      );
    }
    setIsLoginModal((preState) => !preState);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginModal) {
      try {
        await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login();
      } catch (err) {}
    } else {
      try {
        await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          JSON.stringify(
            {
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            },
            {
              'Content-Type': 'application/json',
            }
          )
        );

        auth.login();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Requeired</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginModal && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a Name"
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter valid email address"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter valid password, at least 5 characters"
            onInput={inputHandler}
          />
          <Button type="submit">{isLoginModal ? 'LOGIN' : 'SIGN UP'}</Button>
        </form>
        <Button inverse onClick={switchModalHandler}>
          SWITCH TO{isLoginModal ? ' SIGNUP' : ' LOIGIN'}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
