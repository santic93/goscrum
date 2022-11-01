import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import '../Auth.style.css';
import * as Yup from 'yup';
const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;
export const Login = () => {
  const navigate = useNavigate();
  const initialValues = { userName: '', password: '' };
  const required = '*Este campo es obligatorio';
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, 'LA CANTIDAD MINIMA DE CARACTERES ES 4')
      .required(required),
    password: Yup.string().required(required),
  });
  const onSubmit = () => {
    console.log('entre');
    //localStorage.setItem('logged', 'true');
    const { userName, password } = values;
    fetch(
      `${API_ENDPOINT}auth/login`,

      {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          user: {
            userName,
            password,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // navigate('/', { replace: true });
        // localStorage.setItem('logged', data?.result?.token);
      });
  };
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, errors, touched, handleBlur, values } =
    formik;
  return (
    <div className='auth'>
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesion</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            type='text'
            name='userName'
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? 'error' : ''}
          />
          {errors.userName && touched.userName && (
            <span>{errors.userName}</span>
          )}
        </div>
        <div>
          <label htmlFor=''>Contraseña</label>
          <input
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? 'error' : ''}
          />
          {errors.password && touched.password && (
            <span>{errors.password}</span>
          )}
        </div>
        <div>
          <button type='submit'>Enviar</button>
        </div>
        <div>
          <Link to='/register'>Registrarme</Link>
        </div>
      </form>
    </div>
  );
};
