import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schemas
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
        username: values.email,
        password: values.password,
        ...(isSignup && { name: values.name }),
      }),
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', data.token); // Save the token to localStorage
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="container">
      <button onClick={() => setIsSignup(!isSignup)}>
        Switch to {isSignup ? 'Login' : 'Signup'}
      </button>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={isSignup ? SignupSchema : LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {isSignup && <div><label>Name</label><Field name="name" type="text" /><ErrorMessage name="name" component="div" /></div>}
            <div><label>Email</label><Field name="email" type="email" /><ErrorMessage name="email" component="div" /></div>
            <div><label>Password</label><Field name="password" type="password" /><ErrorMessage name="password" component="div" /></div>
            <button type="submit" disabled={isSubmitting}>{isSignup ? 'Signup' : 'Login'}</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginSignup;