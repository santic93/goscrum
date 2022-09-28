import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import "./Login.style.css"


export const Login = () => {
  const navigate = useNavigate();
  const initialValues = { email: '', password: '' };
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required Email';
    }
    if (!values.password) {
      errors.password = 'Required Password';
    }
    return errors;
  };

  const onSubmit = () => {
    localStorage.setItem('logged', 'true');
    navigate('/', { replace: true });
  };
  const formik = useFormik({ initialValues, validate, onSubmit });
  const { handleSubmit, handleChange, values, errors } = formik;
  return (
    <div className='auth'>
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesion</h1>
        <div>
          <label htmlFor=''>Email</label>
          <input
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <span>Email requerido</span>}
        </div>
        <div>
          <label htmlFor=''>Contraseña</label>
          <input
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <span>Password requerido</span>}
        </div>
        <div>
          <button type='submit'>Enviar</button>
        </div>
      </form>
    </div>
  );
};
