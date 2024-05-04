import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import "./LoginSignup.css"
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons';

// Validation schemas

const userSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Perform validation check or automatically log in
    }
  }, []);

  const handleSubmit = (values) => {
    const url = isSignup ? 'http://localhost:8080/users' : 'http://localhost:8080/login';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: values.username,
            password: values.password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            Cookies.set('token', data.access_token, { expires: 1 });
            console.log('Success:', data);
        } else {
            console.error('Error:', data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  };

  return (
    <>
    <div className="container">
      <button onClick={() => setIsSignup(!isSignup)}>
        Switch to {isSignup ? 'Login' : 'Signup'}
      </button>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={isSignup ? SignupSchema : LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
    <Form>
        <div className="input">
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
        </div>
        <div className="input">
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />
        </div>
        <button type="submit" className="submit" disabled={isSubmitting}>
            {isSignup ? 'Sign Up' : 'Log In'}
        </button>
        {isSubmitting && <p>Loading...</p>}
    </Form>
                    )}
      </Formik>
      <div className="social-login-buttons">
          <GoogleLoginButton onClick={() => console.log("Login with Google")} />
          <FacebookLoginButton onClick={() => console.log("Login with Facebook")} />
      </div>
    </div>
    </>
  );
};

export default LoginSignup;