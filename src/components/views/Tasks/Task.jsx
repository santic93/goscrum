import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
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
  const [search, setSearch] = useState('');
  const [tasksFromWho, setTasksFromWho] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [renderList, setRenderList] = useState(null);
  const [list, setList] = useState(null);
  const { isPhone } = useResize();
  useEffect(() => {
    setLoading(true);

    fetch(`https:${API_ENDPOINT}task${tasksFromWho === 'ME' ? '/me' : ''}`, {
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
        }, 1500);
      });
  }, [tasksFromWho]);

  useEffect(() => {
    if (search) {
      setRenderList(list?.filter((data) => data.title.startsWith(search)));
    } else {
      setRenderList(list);
    }
  }, [search]);

  // const limitString = (str) => {
  //   if (str.length > 370) {
  //     return { string: str.slice(0, 367).concat('...'), addButton: true };
  //     return { string: str, addButton: false };
  //   }
  // };

  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
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
  const handleSearch = debounce((event) => {
    setSearch(event?.target?.value);
  }, 1000);

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
                onChange={(event) => {
                  setTasksFromWho(event.currentTarget.value);
                }}
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
            <div className='search'>
              <input
                type='text'
                placeholder='Buscar por titulo...'
                onChange={handleSearch}
              />
            </div>
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
                    {renderColumnCards('NEW')}
                  </div>
                  <div className='list '>
                    <h4>En Proceso</h4>
                    {renderColumnCards('IN PROGRESS')}
                  </div>
                  <div className='list'>
                    <h4>Finalizadas</h4>
                    {renderColumnCards('FINISHED')}
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
