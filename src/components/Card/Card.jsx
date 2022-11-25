import React, { useState } from 'react';

export default function Card({
  data: {
    title,
    createdAt,
    user: { userName },
    description,
    status,
    importance,
  },
}) {
  console.log(description);
  const [showMore, setShowMore] = useState(false);
  const dateTime = new Date(createdAt).toLocaleString() + 'HS.';

  const limitString = (str) => {
    if (str.length > 1)
      return { string: str.slice(0, 167).concat('...'), addButton: true };
    return { string: str, addButton: false };
  };

  return (
    <div className='card'>
      <div className='close'>X</div>
      <h3>Titulo: {title}</h3>
      <h6>Hora: {dateTime}</h6>
      <h5>Usuario: {userName}</h5>
      <button className={status.toLowerCase()} type='button'>
        Estado: {status.toLowerCase()}
      </button>
      <button className={importance.toLowerCase()} type='button'>
        Importancia: {importance.toLowerCase()}
      </button>
      {!showMore && <p>Descripcion: {limitString(description).string}</p>}
      {showMore && (
        <>
          <p>Descripcion: {description}</p>
          <button
            type='button'
            onClick={() => {
              setShowMore(false);
            }}
          >
            Ver menos
          </button>
        </>
      )}
      {!showMore && limitString(description).addButton && (
        <button
          type='button'
          onClick={() => {
            setShowMore(true);
          }}
        >
          Ver mas
        </button>
      )}
    </div>
  );
}
