# TP N°3 — Estado Global con Context API y useReducer

**Materia:** Taller de Lenguajes de Programación III (React Native)  
**Docente:** Rolón Lautaro Emanuel  
**Docente auxiliar:** Mereles Juliana Aracelli  
**Alumnos:** Augusto · Fabricio

---

## Descripción

Extensión del TP N°2 (Mundo Boca Gestión) incorporando manejo de **estado global** mediante Context API y useReducer de React.

---

## Estructura relevante

```
frontend/src/
├── context/
│   ├── JugadoresContext.jsx   ← Context + Provider + lógica CRUD
│   └── jugadoresReducer.js    ← Reducer + estado inicial
├── components/
│   ├── Formulario.jsx
│   └── JugadorItem.jsx
└── App.jsx
```

---

## Context — `JugadoresContext.jsx`

Se crea el contexto con `createContext` y se expone mediante un Provider que encapsula toda la lógica de comunicación con la API.

```js
const JugadoresContext = createContext();
export const useJugadores = () => useContext(JugadoresContext);
```

El `JugadoresProvider` utiliza `useReducer` internamente y expone al árbol de componentes:

| Valor expuesto      | Descripción                              |
|---------------------|------------------------------------------|
| `jugadores`         | Lista de jugadores del estado global     |
| `cargando`          | Indicador de carga inicial               |
| `error`             | Mensaje de error si falla la API         |
| `jugadorEnEdicion`  | Jugador seleccionado para editar         |
| `agregarJugador`    | Agrega un jugador via POST               |
| `eliminarJugador`   | Elimina un jugador via DELETE            |
| `iniciarEdicion`    | Setea el jugador a editar                |
| `guardarEdicion`    | Actualiza un jugador via PUT             |
| `cancelarEdicion`   | Limpia el jugador en edición             |

---

## Reducer — `jugadoresReducer.js`

Maneja el estado global a través de acciones tipadas:

| Acción           | Descripción                                      |
|------------------|--------------------------------------------------|
| `SET_JUGADORES`  | Carga la lista inicial desde la API              |
| `ADD_JUGADOR`    | Agrega un nuevo jugador al estado                |
| `UPDATE_JUGADOR` | Reemplaza un jugador editado en la lista         |
| `DELETE_JUGADOR` | Elimina un jugador por id                        |
| `SET_EDIT`       | Guarda el jugador seleccionado para edición      |
| `CLEAR_EDIT`     | Limpia la selección de edición                   |
| `SET_ERROR`      | Guarda un mensaje de error                       |
| `SET_LOADING`    | Activa/desactiva el indicador de carga           |

**Estado inicial:**
```js
{
  jugadores: [],
  cargando: true,
  error: null,
  jugadorEnEdicion: null,
}
```

---

## Cómo correr el proyecto

### Backend
```bash
cd backend
npm install
node index.js
# Corre en http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Corre en http://localhost:5173
```

---

## Funcionalidades

- Listado de jugadores consumido desde la API REST
- Búsqueda por nombre en tiempo real
- Agregar jugador mediante formulario
- Editar jugador existente
- Eliminar jugador
- Todo el estado gestionado globalmente sin prop drilling