import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

const LoginForm = ({ onLogin, onClose }) => (
  <div className="login-modal">
    <div className="login-modal-content">
      <button className="close-modal" onClick={onClose}>
        &times;
      </button>
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          onLogin(values.username);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, errors }) => (
          <Form className="login-form">
            <div>
              <label htmlFor="username">Username:</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !values.username ||
                !values.password ||
                errors.username ||
                errors.password
              }
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

export default LoginForm;
