import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddCharacterForm from './components/AddCharacterForm';
import EditCharacterForm from './components/EditCharacterForm';
import CharacterList from './components/CharacterList';
import SearchBar from './components/SearchBar';
import './index.css';

const API_URL = 'http://localhost:3000/characters';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list'); 
  const [editingCharacter, setEditingCharacter] = useState(null);

  const fetchAllCharacters = () => {
    setLoading(true);
    axios.get(API_URL)
      .then(res => {
        setCharacters(res.data);
        setError(null);
      })
      .catch(err => {
        console.error('Erreur de chargement:', err);
        setError('Impossible de charger les personnages. Le backend est-il démarré ?');
        setCharacters([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (searchId) => {
    if (!searchId.trim()) {
      setError("Veuillez entrer un ID pour rechercher.");
      return;
    }
    setLoading(true);
    setError(null);
    axios.get(`${API_URL}/${searchId}`)
      .then(res => {
        setCharacters([res.data]);
      })
      .catch(err => {
        console.error("Erreur de recherche:", err);
        setCharacters([]);
        setError(`Personnage avec l'ID "${searchId}" non trouvé.`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteCharacter = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce personnage ?')) {
      axios.delete(`${API_URL}/${id}`)
        .then(() => {
          fetchAllCharacters();
        })
        .catch(err => {
          console.error("Erreur de suppression:", err);
          setError('Impossible de supprimer le personnage.');
        });
    }
  };

  const handleCharacterAdded = (newCharacter) => {
    setCharacters(prev => [...prev, newCharacter]);
    setView('list');
    fetchAllCharacters();
  };

  const handleCharacterUpdated = (updatedCharacter) => {
    setCharacters(prev => prev.map(c => c.id === updatedCharacter.id ? updatedCharacter : c));
    setView('list');
    setEditingCharacter(null);
  };

  const handleEdit = (character) => {
    setEditingCharacter(character);
    setView('edit');
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  const renderContent = () => {
    if (view === 'add') {
      return <AddCharacterForm onCharacterAdded={handleCharacterAdded} onCancel={() => setView('list')} />;
    }
    if (view === 'edit') {
      return <EditCharacterForm character={editingCharacter} onCharacterUpdated={handleCharacterUpdated} onCancel={() => setView('list')} />;
    }

    return (
      <>
        <SearchBar onSearch={handleSearch} onShowAll={fetchAllCharacters} />
        <div className="flex justify-end mb-6">
          <button onClick={() => setView('add')} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
            + Ajouter un personnage
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Chargement...</p>
        ) : error ? (
          <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>
        ) : characters.length > 0 ? (
          <CharacterList characters={characters} onEdit={handleEdit} onDelete={handleDeleteCharacter} />
        ) : (
          <p className="text-center text-gray-500 bg-gray-100 p-6 rounded-lg">Aucun personnage trouvé.</p>
        )}
      </>
    );
  };

  return (
    <div className="bg-gray-500 min-h-screen font-sans ">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <header className="mb-8 text-center bg-amber-600">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight">
            Gestionnaire de Personnages Marvel
          </h1>
          <p className="text-gray-600 mt-2">Créez, modifiez, supprimez et recherchez vos personnages favoris.</p>
        </header>
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;