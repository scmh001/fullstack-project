import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./LoginSignup.css"
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons';
import { useNavigate } from 'react-router-dom';

// Validation schemas for user, login, and signup forms
const userSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

// Main component for login and signup functionality
const LoginSignup = ({updateUser, user}) => {
  // State to toggle between login and signup forms
  const [isSignup, setIsSignup] = useState(false);

  // Hook to navigate programmatically
  const navigate = useNavigate()

  // Function to handle form submission
  const handleSubmit = (values) => {
    // Determine the URL based on whether the user is signing up or logging in
    const url = isSignup ? 'http://localhost:8080/users' : 'http://localhost:8080/login';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.email.toLowerCase(),  // Convert email to lowercase to ensure case-insensitivity
            password: values.password
        }),
    })
    .then(response => {
      if (response.ok){
        return response.json()
      }else{
        console.error('Error')
      }
    })
    .then(data => {
        updateUser(data) // Update user state with response data
        console.log('Success:', data);
        navigate('/', { relative: 'path' }); // Navigate to home page on successful login/signup
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  };

  return (
    <>
    <div className="container">
      {/* Button to toggle between login and signup forms */}
      <button onClick={() => setIsSignup(!isSignup)}>
        Switch to {isSignup ? 'Login' : 'Signup'}
      </button>
      {/* Formik form for handling login/signup */}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={isSignup ? SignupSchema : LoginSchema} // Choose the correct validation schema
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
        {/* Submit button, disabled while submitting */}
        <button type="submit" className="submit" disabled={isSubmitting}>
            {isSignup ? 'Sign Up' : 'Log In'}
        </button>
        {isSubmitting && <p>Loading...</p>}
    </Form>
                    )}
      </Formik>
      {/* Social login buttons */}
      <div className="social-login-buttons">
          <GoogleLoginButton onClick={() => console.log("Login with Google")} />
          <FacebookLoginButton onClick={() => console.log("Login with Facebook")} />
      </div>
    </div>
    </>
  );
};

export default LoginSignup;