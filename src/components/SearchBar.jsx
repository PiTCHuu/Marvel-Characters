import React, { useState } from 'react';

const SearchBar = ({ onSearch, onShowAll }) => {
  const [searchId, setSearchId] = useState('');

  const handleLocalSearch = (e) => {
    e.preventDefault();
    onSearch(searchId);
  };
  
  const handleShowAll = () => {
      setSearchId('');
      onShowAll();
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6 border border-gray-200">
      <form onSubmit={handleLocalSearch} className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Rechercher par ID..."
          className="w-full sm:flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex gap-2">
          <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Rechercher</button>
          <button type="button" onClick={handleShowAll} className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Afficher tout</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;