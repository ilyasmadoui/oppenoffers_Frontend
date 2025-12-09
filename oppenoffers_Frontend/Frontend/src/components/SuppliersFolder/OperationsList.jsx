// components/OperationsList.jsx
import React from 'react';
import SearchBar from './SearchBarSupr';
import OperationCard from './OperationCard';

export default function OperationsList({
  operations,
  selectedOp,
  searchTerm,
  onSearchChange,
  onClearSearch,
  onToggleOp
}) {
  return (
    <div className="operations-container">
      <div className="section-header">
        <div className="section-title">
          <h3>Opérations disponibles</h3>
          <span className="section-subtitle">Sélectionnez une opération</span>
        </div>
        
        <div className="section-stats">
          <span className="stat-badge">
            {operations.filter(op => !op.completed).length} dispo. • {operations.length} total
          </span>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onClearSearch={onClearSearch}
          resultsCount={operations.length}
        />
        
      </div>
      
      <div className="operations-grid">
        {operations.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h4>Aucune opération trouvée</h4>
            <p>Aucune opération ne correspond à votre recherche "{searchTerm}"</p>
            <button 
              className="reset-search-btn"
              onClick={onClearSearch}
            >
              Réinitialiser la recherche
            </button>
          </div>
        ) : (
          operations.map(op => (
            <OperationCard
              key={op.id}
              operation={op}
              isSelected={selectedOp === op.id}
              onToggle={() => onToggleOp(op.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}