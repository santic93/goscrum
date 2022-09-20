import React, { useState } from 'react';
import { useFormik } from 'formik';

export const Login = () => {
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
  };
  const formik = useFormik({ initialValues, validate, onSubmit });
  const { handleSubmit, handleChange, values, errors } = formik;
  return (
    <div className='container'>
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
