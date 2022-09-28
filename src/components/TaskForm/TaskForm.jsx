import { useFormik } from 'formik';
import * as Yup from 'yup';
import './TaskForm.styles..css';

export const TaskForm = () => {
  const initialValues = {
    title: '',
    status: '',
    priority: '',
    description: '',
  };
  const required = '*Este campo es obligatorio';
  const onSubmit = () => {};
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, 'LA CANTIDAD MINIMA DE CARACTERES ES 6')
      .required(required),
    status: Yup.string()
      .min(6, 'LA CANTIDAD MINIMA DE CARACTERES ES 6')
      .required(required),
    priority: Yup.string()
      .min(6, 'LA CANTIDAD MINIMA DE CARACTERES ES 6')
      .required(required),
  });
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, errors, touched, handleBlur } = formik;
  return (
    <section className='task-form'>
      <h2>Crear Tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              name='title'
              type='text'
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Titulo'
              className={errors.title ? 'error' : ''}
            />
            {errors.title && touched.title && <span className='error-message'>{errors.title}</span>}
          </div>
          <div>
            <select
              name='status'
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.status ? 'error' : ''}
            >
              <option value=''>Seleccionar un estado</option>
              <option value='new'>Nueva</option>
              <option value='inProcess'>En Proceso</option>
              <option value='finished'>Terminada</option>
            </select>
            {errors.status && touched.status && <span className='error-message'>{errors.status}</span>}
          </div>

          <div>
            <select
              name='priority'
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.priority ? 'error' : ''}
            >
              <option value=''>Seleccionar prioridad</option>
              <option value='low'>Baja</option>
              <option value='medium'>Media</option>
              <option value='hight'>Alta</option>
            </select>
            {errors.priority && touched.priority && (
              <span className='error-message'>{errors.priority}</span>
            )}
          </div>
        </div>
        <div>
          <textarea
            name='description'
            onChange={handleChange}
            placeholder='Descripcion'
          />
        </div>
        <button type='submit'>Crear</button>
      </form>
    </section>
  );
};
