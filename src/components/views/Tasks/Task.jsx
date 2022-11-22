import { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Task.styles.css';
import { useResize } from '../../../hooks/useResize';
import { Header } from '../../Header/Header';
import Card from '../../Card/Card';
import { TaskForm } from '../../TaskForm/TaskForm';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;
export const Task = () => {
  const [loading, setLoading] = useState(false);
  const [renderList, setRenderList] = useState(null);
  const [list, setList] = useState(null);
  const { isPhone } = useResize();
  useEffect(() => {
    setLoading(true);

    fetch(`https:${API_ENDPOINT}task`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('logged'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setList(data?.result);
        setRenderList(data?.result);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  }, []);
  const limitString = (str) => {
    if (str.length > 370) {
      return { string: str.slice(0, 367).concat('...'), addButton: true };
      return { string: str, addButton: false };
    }
  };
  const renderAllCards = () => {
    return renderList?.map((data) => <Card key={data.id} data={data} />);
  };
  const renderNewCards = () => {
    return renderList
      ?.filter((data) => data.status === 'NEW')
      .map((data) => <Card key={data.id} data={data} />);
  };
  const renderInProgressCards = () => {
    return renderList
      ?.filter((data) => data.status === 'IN PROGRESS')
      .map((data) => <Card key={data.id} data={data} />);
  };
  const renderFinishedCards = () => {
    return list
      ?.filter((data) => data.status === 'FINISHED')
      .map((data) => <Card key={data.id} data={data} />);
  };
  const handleChangeImportance = (event) => {
    if (event.currentTarget.value === 'ALL') {
      setRenderList(list);
    } else {
      setRenderList(
        list?.filter((data) => data.importance === event.currentTarget.value)
      );
    }
  };
  return (
    <>
      <Header />
      <main id='tasks'>
        <TaskForm />
        <section className='wrapper_list'>
          <div className='list_header'>
            <h2>Mis tareas</h2>
          </div>
          <div className='filters'>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
              >
                <FormControlLabel
                  value='ALL'
                  control={<Radio />}
                  label='Todas'
                />
                <FormControlLabel
                  value='ME'
                  control={<Radio />}
                  label='Mis tareas'
                />
              </RadioGroup>
            </FormControl>
            <select name='importance' onChange={handleChangeImportance}>
              <option value=''>Seleccione una prioridad</option>
              <option value='ALL'>Todas</option>
              <option value='LOW'>Baja</option>
              <option value='MEDIUM'>Media</option>
              <option value='HIGH'>Alta</option>
            </select>
          </div>
          {isPhone ? (
            !renderList?.length ? (
              <div>No hay tareas creadas</div>
            ) : loading ? (
              <>
                <Skeleton height={90} />
                <Skeleton height={90} />
                <Skeleton height={90} />
              </>
            ) : (
              <div className='list phone'>{renderAllCards()}</div>
            )
          ) : (
            <div className='list_group'>
              {!renderList?.length ? (
                loading ? (
                  <>
                    <Skeleton height={90} />
                    <Skeleton height={90} />
                    <Skeleton height={90} />
                  </>
                ) : (
                  <div>No hay tareas creadas</div>
                )
              ) : (
                <>
                  <div className='list'>
                    <h4>Nuevas</h4>
                    {renderNewCards()}
                  </div>
                  <div className='list '>
                    <h4>En Proceso</h4>
                    {renderInProgressCards()}
                  </div>
                  <div className='list'>
                    <h4>Finalizadas</h4>
                    {renderFinishedCards()}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};
