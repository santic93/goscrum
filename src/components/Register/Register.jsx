import React, { useState } from 'react';
import { useFormik } from 'formik';

export const Register = () => {
  const initialValues = { email: '', password: '' };

  const onSubmit = () => {
    alert();
  };
  const formik = useFormik({ initialValues, onSubmit });
  const { handleSubmit, handleChange, values, errors } = formik;
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label htmlFor=''>Nombre de usuario</label>
          <input
            type='text'
            name='userName'
            value={values.userName}
            onChange={handleChange}
          />
          {errors.userName && <span>{errors.userName}</span>}
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
          <label htmlFor=''>Email</label>
          <input
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <input type='hidden' name='teamID' value='' />
        <div>
          <label htmlFor=''>Rol</label>
          <select name='role' value={values.role} onChange={handleChange}>
            <option value='Team Member'>Team Member</option>
            <option value='Team Leader'>Team Leader</option>
          </select>

          {errors.role && <span>{errors.role}</span>}
        </div>
        <div>
          <label htmlFor=''>Continente</label>
          <select
            name='continent'
            value={values.continent}
            onChange={handleChange}
          >
            <option value='America'>America</option>
            <option value='Europa'>Europa</option>
            <option value='Otro'>Otro</option>
          </select>

          {errors.continent && <span>{errors.continent}</span>}
        </div>
        <div>
          <label htmlFor=''>Region</label>
          <select name='region' value={values.region} onChange={handleChange}>
            <option value='Brasil'>Brasil</option>
            <option value='America del Norte'>America del Norte</option>
            <option value='Otro'>Otro</option>
          </select>

          {errors.region && <span>{errors.region}</span>}
        </div>
        <div>
          <button type='submit'>Enviar</button>
        </div>
      </form>
    </div>
  );
};
