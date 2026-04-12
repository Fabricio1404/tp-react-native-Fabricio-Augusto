import React from 'react';

const JugadorItem = ({ jugador, alBorrar, alEditar }) => {
  return (
    <article className="player-card">
      <div className="player-dorsal">#{jugador.dorsal}</div>
      <h3 className="player-name">{jugador.nombre}</h3>
      <p className="player-position">{jugador.posicion}</p>
      <button onClick={() => alEditar(jugador)} className="btn-edit">
        EDITAR
      </button>
      <button onClick={() => alBorrar(jugador.id)} className="btn-delete">
        ELIMINAR
      </button>
    </article>
  );
};

export default JugadorItem;