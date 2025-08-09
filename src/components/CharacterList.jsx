import React from 'react';

const CharacterList = ({ characters, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {characters.map(c => (
        <div key={c.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center border border-gray-200">
          <div>
            <p className="text-xl font-bold text-gray-900">{c.name}</p>
            <p className="text-gray-600">{c.realName} – <em className="text-gray-500">{c.universe}</em></p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(c)} className="px-4 py-2 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">Modifier</button>
            <button onClick={() => onDelete(c.id)} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;