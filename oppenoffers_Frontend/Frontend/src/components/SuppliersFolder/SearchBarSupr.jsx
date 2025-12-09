// components/SearchBar.jsx
import React from 'react';

export default function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  onClearSearch, 
  resultsCount 
}) {
  return (
    <div className="search-container">
        <div className="search-bar">
          <span className="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="text"
            placeholder=" Rechercher par numéro d'opération..."
            value={searchTerm}
            onChange={onSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search-btn"
              onClick={onClearSearch}
              title="Effacer la recherche"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        
        {searchTerm && (
          <div className="search-results-info">
            <div className="results-count">
              <span className="count-number">{resultsCount}</span>
              <span className="count-label">opération(s) trouvée(s)</span>
            </div>
            <div className="divider"></div>
            <button 
              className="reset-search-btn"
              onClick={onClearSearch}
            >
              <span className="reset-icon">↺</span>
              Afficher tout
            </button>
          </div>
        )}
    </div>
  );
}