import React, { useState } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import JugadorItem from './components/JugadorItem';
import { useJugadores } from './context/JugadoresContext';

function App() {
  const [busqueda, setBusqueda] = useState('');
  const { jugadores, cargando, error, iniciarEdicion } = useJugadores();

  
  // Las acciones CRUD se manejan desde el Context (useJugadores)

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

        <Formulario />

      {cargando && <p className="status-text">Cargando el plantel...</p>}
      {error && <p className="status-text error-text">{error}</p>}

      <section className="players-grid">
        {filtrados.map(j => (
          <JugadorItem key={j.id} jugador={j} />
        ))}
      </section>
    </main>
  );
}

export default App;