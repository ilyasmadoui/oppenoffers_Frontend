// components/SelectionSummary.jsx
import React from 'react';

export default function SelectionSummary({ 
  selectedOperation, 
  selectedOp, 
  selectedLots, 
  onClearSelection 
}) {
  return (
    <div className="selection-summary">
      <div className="summary-header">
        <h4>📝 Récapitulatif</h4>
        <span className="summary-count">{selectedLots.length} lot(s)</span>
      </div>
      <div className="summary-content">
        <p><strong>Opération:</strong> {selectedOperation?.name} (OP-{selectedOp})</p>
        <div className="selected-lots">
          <strong>Lots sélectionnés:</strong>
          <div className="lot-tags">
            {selectedLots.map(lotId => {
              const lot = selectedOperation.lots.find(l => l.id === lotId);
              return (
                <span key={lotId} className="lot-tag">
                  {lot?.name}
                </span>
              );
            })}
          </div>
        </div>
        <div className="summary-actions">
          <button 
            className="btn-clear"
            onClick={onClearSelection}
          >
            ✕ Effacer la sélection
          </button>
        </div>
      </div>
    </div>
  );
}