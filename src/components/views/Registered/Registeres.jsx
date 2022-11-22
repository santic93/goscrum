import React from 'react';
import { Link, useParams } from 'react-router-dom';
const Registeres = () => {
  const { teamID } = useParams();
  return (
    <>
    <div className='container'>
      El team ID de tu equipo es : {teamID}
    </div>
  <button>
  <Link to='/login'>Login</Link>
    
  </button>
     
      </>
  );
};

export default Registeres;
