// components/LotRow.jsx
import React from 'react';

export default function LotRow({ lot, isSelected, onToggle }) {
  const isAvailable = lot.available;

  return (
    <div 
      className={`table-row ${!isAvailable ? 'unavailable' : ''} ${isSelected ? 'selected' : ''}`}
    >
      <div className="td-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          disabled={!isAvailable}
        />
      </div>
      <div className="td-name">
        <div className="lot-name-display">
          <span className="lot-name">{lot.name}</span>
          {isSelected && (
            <span className="selected-tag">Sélectionné</span>
          )}
        </div>
      </div>
      <div className="td-status">
        <span className={`status-badge ${isAvailable ? 'available' : 'unavailable'}`}>
          {isAvailable ? 'Disponible' : 'Attribué'}
        </span>
      </div>
      <div className="td-action">
        <button
          className={`btn-select ${isSelected ? 'selected' : ''}`}
          onClick={onToggle}
          disabled={!isAvailable}
        >
          {isSelected ? 'Désélectionner' : 'Sélectionner'}
        </button>
      </div>
    </div>
  );
}