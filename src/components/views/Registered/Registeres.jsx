import React from 'react';
import { useParams } from 'react-router-dom';
const Registeres = () => {
  const { teamID } = useParams();
  return <div className='container'>El team ID de tu equipo es : {teamID}</div>;
};

export default Registeres;
