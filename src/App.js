import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import { Login } from './components/views/Login/Login';
import { Register } from './components/views/Register/Register';
import { Task } from './components/views/Tasks/Task';
import { lazy, Suspense } from 'react';

const Error404 = lazy(() => import('./components/views/Error404/Error404'));

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem('logged')) {
    return <Navigate to='/login' replace={true} />;
  }
  return children;
};

const paginateTransition = {
  in: {
    opacity: 1,
  },
  out: { opacity: 0 },
};
export const App = () => {
  const location = useLocation();
  return (
    
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path='/register'
          element={
            <motion.div
              className='page'
              initial='out'
              animate='in'
              exit='out'
              variants={paginateTransition}
            >
              <Register />
            </motion.div>
          }
        />
        <Route
          path='/login'
          element={
            <motion.div
              className='page'
              initial='out'
              animate='in'
              exit='out'
              variants={paginateTransition}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path='*'
          element={
            <motion.div
              className='page'
              initial='out'
              animate='in'
              exit='out'
              variants={paginateTransition}
            >
            <Suspense fallback={<>......</>}>
              <Error404 />
              </Suspense>
            </motion.div>
          }
        />
        <Route
          path='/'
          element={
            <RequireAuth>
              <motion.div
                className='page'
                initial='out'
                animate='in'
                exit='out'
                variants={paginateTransition}
              >
                <Task />
              </motion.div>
            </RequireAuth>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};
