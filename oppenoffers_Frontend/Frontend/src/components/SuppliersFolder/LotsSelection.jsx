// components/LotsSelection.jsx
import React from 'react';
import LotRow from './LotRow';
import SelectionSummary from './SelectionSummary';

export default function LotsSelection({
  selectedOp,
  selectedOperation,
  selectedLots,
  onToggleLot,
  onSelectAll,
  onDeselectAll
}) {
  if (!selectedOp) {
    return (
      <div className="lots-container">
        <div className="section-header">
          <div className="section-title">
            <h3>Sélection des lots</h3>
            <span className="section-subtitle">Choisissez d'abord une opération</span>
          </div>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h4>Aucune opération sélectionnée</h4>
          <p>Cliquez sur une opération pour afficher ses lots</p>
        </div>
      </div>
    );
  }

  if (!selectedOperation?.lots.length) {
    return (
      <div className="lots-container">
        <div className="section-header">
          <div className="section-title">
            <h3>Lots - {selectedOperation?.name}</h3>
            <span className="section-subtitle">Sélectionnez les lots à attribuer manuellement</span>
          </div>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h4>Aucun lot disponible</h4>
          <p>Cette opération ne contient pas de lots</p>
        </div>
      </div>
    );
  }

  const availableLots = selectedOperation.lots.filter(lot => lot.available).length;
  const allSelected = selectedLots.length === availableLots && availableLots > 0;

  return (
    <div className="lots-container">
      <div className="section-header">
        <div className="section-title">
          <h3>Lots - {selectedOperation?.name}</h3>
          <span className="section-subtitle">Sélectionnez les lots à attribuer manuellement</span>
        </div>
        
        <div className="selection-controls">
          <div className="selection-stats">
            <span className="counter">
              <strong>{selectedLots.length}</strong> sélectionné(s)
            </span>
            <span className="available-count">
              {availableLots} disponible(s)
            </span>
          </div>
          
          <div className="action-buttons">
            <button 
              className="btn-select-all"
              onClick={onSelectAll}
              disabled={availableLots === 0}
            >
              <span>✓ Tout</span>
            </button>
            <button 
              className="btn-deselect-all"
              onClick={onDeselectAll}
              disabled={selectedLots.length === 0}
            >
              <span>✕ Aucun</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="lots-selection">
        <div className="lots-table">
          <div className="table-header">
            <div className="th-checkbox">
              <input 
                type="checkbox" 
                checked={allSelected}
                onChange={() => {
                  if (allSelected) {
                    onDeselectAll();
                  } else {
                    onSelectAll();
                  }
                }}
                disabled={availableLots === 0}
              />
            </div>
            <div className="th-name">Nom du lot</div>
            <div className="th-status">Statut</div>
            <div className="th-action">Action</div>
          </div>
          
          <div className="table-body">
            {selectedOperation.lots.map(lot => (
              <LotRow
                key={lot.id}
                lot={lot}
                isSelected={selectedLots.includes(lot.id)}
                onToggle={() => onToggleLot(lot.id)}
              />
            ))}
          </div>
        </div>
        
        {selectedLots.length > 0 && (
          <SelectionSummary
            selectedOperation={selectedOperation}
            selectedOp={selectedOp}
            selectedLots={selectedLots}
            onClearSelection={onDeselectAll}
          />
        )}
      </div>
    </div>
  );
}