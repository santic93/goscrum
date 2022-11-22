import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import '../Auth.style.css';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const { REACT_APP_API_ENDPOINT } = process.env;
export const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    fetch('https://goscrum-api.alkemy.org/auth/data')
      .then((response) => response.json())
      .then((data) => setData(data.result));
  }, []);

  const initialValues = {
    userName: '',
    password: '',
    email: '',
    role: '',
    continent: '',
    region: '',
    switch: false,
  };
  const required = '*Este campo es obligatorio';
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, 'LA CANTIDAD MINIMA DE CARACTERES ES 4')
      .required(required),
    password: Yup.string().required(required),
    email: Yup.string().email('Debe ser un email valido').required(required),
    role: Yup.string().required(required),
    continent: Yup.string(),
    region: Yup.string().required(required),
  });
  const handleChangeContinent = (value) => {
    setFieldValue('continent', value);
    if (value !== 'America') setFieldValue('region', 'Otro');
  };
  const onSubmit = () => {
    console.log({ values });
    const teamID = !values.teamID ? uuidv4() : values.teamID;
    fetch(`https:${REACT_APP_API_ENDPOINT}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) =>
         navigate('/registered/' + data?.result?.user?.teamID, { replace: true })
      );
  };
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    values,
  } = formik;
 
  return (
    <div className='auth'>
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label htmlFor=''>Nombre de usuario</label>
          <input
            type='text'
            name='userName'
            value={values.userName}
            onChange={handleChange}
            className={errors.userName && touched.userName ? 'error' : ''}
            onBlur={handleBlur}
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
            className={errors.password && touched.password ? 'error' : ''}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <span>{errors.password}</span>
          )}
        </div>
        <div>
          <label htmlFor=''>Email</label>
          <input
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            className={errors.email && touched.email ? 'error' : ''}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && <span>{errors.email}</span>}
        </div>
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={() =>
                formik.setFieldValue('switch', !formik.values.switch)
              }
              name='switch'
              color='secondary'
            />
          }
          label='Perteneces a un equipo ya creado'
        />
        {values.switch && (
          <div>
            <label> Por favor, introduce el identificador de equipo</label>
            <input
              type='text'
              name='teamID'
              value={values.teamID}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <label htmlFor=''>Rol</label>
          <select
            name='role'
            value={values.role}
            onChange={handleChange}
            className={errors.role && touched.role ? 'error' : ''}
            onBlur={handleBlur}
          >
            <option value=''>Seleccionar Rol</option>
            {data?.Rol?.map((option, ind) => (
              <option value={option} key={ind}>
                {option}
              </option>
            ))}
          </select>
          {errors.role && touched.role && <span>{errors.role}</span>}
        </div>
        <div>
          <label htmlFor=''>Continente</label>
          <select
            name='continent'
            value={values.continent}
            onChange={(event) =>
              handleChangeContinent(event.currentTarget.value)
            }
            className={errors.continent && touched.continent ? 'error' : ''}
            onBlur={handleBlur}
          >
            <option value=''>Seleccionar Continente</option>
            {data?.continente?.map((option, ind) => (
              <option value={option} key={ind}>
                {option}
              </option>
            ))}
          </select>
          {errors.continent === 'America' && touched.continent && (
            <span>{errors.continent}</span>
          )}
        </div>
        {values.continent === 'America' && (
          <div>
            <label htmlFor=''>Region</label>
            <select
              name='region'
              value={values.region}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.region && touched.region ? 'error' : ''}
            >
              <option value=''>Seleccionar Region</option>
              {data?.region?.map((option, ind) => (
                <option value={option} key={ind}>
                  {option}
                </option>
              ))}
            </select>

            {errors.region && touched.region && <span>{errors.region}</span>}
          </div>
        )}

        <div>
          <button type='submit'>Enviar</button>
        </div>
        <div>
          <Link to='/login'>Iniciar Sesion</Link>
        </div>
      </form>
    </div>
  );
};
