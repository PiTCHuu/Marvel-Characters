import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/characters';

const EditCharacterForm = ({ character, onCharacterUpdated, onCancel }) => {
  const [formData, setFormData] = useState({ name: character.name, realName: character.realName, universe: character.universe });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${API_URL}/${character.id}`, formData)
      .then(res => {
        onCharacterUpdated(res.data);
      })
      .catch(err => {
        console.error("Erreur lors de la mise à jour:", err);
        setError('Une erreur est survenue.');
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Modifier {character.name}</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Nom du personnage</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Vrai Nom</label>
          <input type="text" name="realName" value={formData.realName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Univers</label>
          <input type="text" name="universe" value={formData.universe} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors">Annuler</button>
          <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Mettre à jour</button>
        </div>
      </form>
    </div>
  );
};

export default EditCharacterForm;