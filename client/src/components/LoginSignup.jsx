import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginSignup.css';

import user_icon from '@/assets/person.png';
import password_icon from '@/assets/password.png';
import email_icon from '@/assets/email.png';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

function LoginSignup() {
  const [action, setAction] = useState('Sign Up');

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={action === 'Sign Up' ? SignupSchema : LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="inputs">
              {action === 'Sign Up' && (
                <div className="input">
                  <img src={user_icon} alt="" />
                  <Field type="text" name="name" placeholder="Name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
              )}
              <div className="input">
                <img src={email_icon} alt="email" />
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="input">
                <img src={password_icon} alt="password" />
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
            </div>
            <div className="forgot-password">
              Lost Password? <span>Click Here!</span>
            </div>
            <div className="submit-container">
              <button
                type="button"
                className={action === 'Sign Up' ? 'submit' : 'submit gray'}
                onClick={() => setAction('Sign Up')}
              >
                Sign Up
              </button>
              <button
                type="button"
                className={action === 'Login' ? 'submit' : 'submit gray'}
                onClick={() => setAction('Login')}
              >
                Login
              </button>
              <button
                type="submit"
                className="submit-post"
                disabled={isSubmitting}
              >
                Confirm
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginSignup;