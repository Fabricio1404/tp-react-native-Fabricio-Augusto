import React, { useState, useEffect } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import JugadorItem from './components/JugadorItem';

function App() {
  const [jugadores, setJugadores] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [jugadorEnEdicion, setJugadorEnEdicion] = useState(null);

  // Cargar datos (GET) - [cite: 40, 69]
  useEffect(() => {
    fetch('http://localhost:5000/jugadores')
      .then(res => res.json())
      .then(data => {
        setJugadores(data);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al conectar con la Bombonera (Servidor)");
        setCargando(false);
      });
  }, []);

  const agregarJugador = (nuevo) => {
    fetch('http://localhost:5000/jugadores', {
      method: 'POST', // [cite: 42]
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo)
    })
    .then(res => res.json())
    .then(data => setJugadores([...jugadores, data]));
  };

  const eliminarJugador = (id) => {
    fetch(`http://localhost:5000/jugadores/${id}`, { method: 'DELETE' }) // [cite: 44]
    .then(() => setJugadores(jugadores.filter(j => j.id !== id)));
  };

  const iniciarEdicion = (jugador) => {
    setJugadorEnEdicion(jugador);
  };

  const guardarEdicion = (datosActualizados) => {
    fetch(`http://localhost:5000/jugadores/${jugadorEnEdicion.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosActualizados)
    })
      .then(async res => {
        if (!res.ok) {
          const errorBody = await res.json().catch(() => ({}));
          throw new Error(errorBody.error || 'No se pudo actualizar el jugador');
        }
        return res.json();
      })
      .then(data => {
        setJugadores(
          jugadores.map(j => (j.id === jugadorEnEdicion.id ? { ...j, ...data } : j))
        );
        setJugadorEnEdicion(null);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const cancelarEdicion = () => {
    setJugadorEnEdicion(null);
  };

  // Lógica de Filtro - [cite: 59, 66]
  const filtrados = jugadores.filter(j => 
    j.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="page">
      <div className="bg-shape bg-shape-left" />
      <div className="bg-shape bg-shape-right" />

      <header className="hero">
        <img src="/logo-boca.png" alt="Boca" className="hero-logo" />
        <div>
          <p className="hero-kicker">Plantel Profesional</p>
          <h1 className="hero-title">Mundo Boca Gestion</h1>
        </div>
        <div className="hero-pill">{jugadores.length} jugadores</div>
      </header>

      <section className="toolbar">
        <input
          placeholder="Buscar jugador por nombre..."
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />
      </section>

      <Formulario
        alAgregar={agregarJugador}
        alGuardarEdicion={guardarEdicion}
        jugadorEnEdicion={jugadorEnEdicion}
        alCancelarEdicion={cancelarEdicion}
      />

      {cargando && <p className="status-text">Cargando el plantel...</p>}
      {error && <p className="status-text error-text">{error}</p>}

      <section className="players-grid">
        {filtrados.map(j => (
          <JugadorItem
            key={j.id}
            jugador={j}
            alBorrar={eliminarJugador}
            alEditar={iniciarEdicion}
          />
        ))}
      </section>
    </main>
  );
}

export default App;