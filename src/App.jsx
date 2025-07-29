import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/characters')
      .then(res => {
        setCharacters(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur :', err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="container">
      <h1>The Marvel Characters : </h1>
      {loading ? <p>Chargement...</p> : (
        <ul>
          {characters.map(c => (
            <li key={c.id}>
              <strong>{c.name}</strong> ({c.realName}) – <em>{c.universe}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
