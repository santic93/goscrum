import React from 'react';

export default function Card({
  data: { title, datetime, creator, description, type, priority },
}) {
  return (
    <div className='card'>
      <div className='close'>X</div>
      <h3>{title}</h3>
      <h6>{datetime}</h6>
      <h5>{creator}</h5>
      <button type='button'>{type}</button>
      <button type='button'>{priority}</button>
      <p>{description}</p>
    </div>
  );
}
