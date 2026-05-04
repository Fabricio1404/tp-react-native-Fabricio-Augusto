import React, { createContext, useContext, useReducer, useEffect } from 'react';
import jugadoresReducer, { initialState } from './jugadoresReducer';

const JugadoresContext = createContext();

export const useJugadores = () => useContext(JugadoresContext);

export const JugadoresProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jugadoresReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    fetch('http://localhost:5000/jugadores')
      .then(res => res.json())
      .then(data => dispatch({ type: 'SET_JUGADORES', payload: data }))
      .catch(() => dispatch({ type: 'SET_ERROR', payload: 'Error al conectar con el servidor' }));
  }, []);

  const agregarJugador = async (nuevo) => {
    const res = await fetch('http://localhost:5000/jugadores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    });
    const data = await res.json();
    dispatch({ type: 'ADD_JUGADOR', payload: data });
  };

  const eliminarJugador = async (id) => {
    await fetch(`http://localhost:5000/jugadores/${id}`, { method: 'DELETE' });
    dispatch({ type: 'DELETE_JUGADOR', payload: id });
  };

  const guardarEdicion = async (datos) => {
    const id = state.jugadorEnEdicion?.id;
    if (!id) return;
    const res = await fetch(`http://localhost:5000/jugadores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'No se pudo actualizar el jugador');
    }
    const data = await res.json();
    dispatch({ type: 'UPDATE_JUGADOR', payload: { ...state.jugadorEnEdicion, ...data } });
  };

  const iniciarEdicion = (jugador) => dispatch({ type: 'SET_EDIT', payload: jugador });
  const cancelarEdicion = () => dispatch({ type: 'CLEAR_EDIT' });

  return (
    <JugadoresContext.Provider value={{
      jugadores: state.jugadores,
      cargando: state.cargando,
      error: state.error,
      jugadorEnEdicion: state.jugadorEnEdicion,
      agregarJugador,
      eliminarJugador,
      iniciarEdicion,
      guardarEdicion,
      cancelarEdicion,
    }}>
      {children}
    </JugadoresContext.Provider>
  );
};

export default JugadoresContext;
