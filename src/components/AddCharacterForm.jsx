import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/characters';

const AddCharacterForm = ({ onCharacterAdded, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', realName: '', universe: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.realName || !formData.universe) {
      setError('Tous les champs sont requis.');
      return;
    }
    axios.post(API_URL, formData)
      .then(res => {
        onCharacterAdded(res.data);
        setFormData({ name: '', realName: '', universe: '' });
      })
      .catch(err => {
        console.error("Erreur lors de l'ajout du personnage:", err);
        setError('Une erreur est survenue. Veuillez réessayer.');
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Ajouter un personnage</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nom du personnage</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="ex: Iron Man" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="realName" className="block text-gray-700 font-semibold mb-2">Vrai Nom</label>
          <input type="text" name="realName" value={formData.realName} onChange={handleChange} placeholder="ex: Tony Stark" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="universe" className="block text-gray-700 font-semibold mb-2">Univers</label>
          <input type="text" name="universe" value={formData.universe} onChange={handleChange} placeholder="ex: Earth-616" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors">Annuler</button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Ajouter</button>
        </div>
      </form>
    </div>
  );
};

export default AddCharacterForm;