// components/ActionPanel.jsx
import React from 'react';

export default function ActionPanel({
  selectedOp,
  selectedLots,
  selectedFournisseur,
  selectedOperation,
  onSave,
  onCancel
}) {
  return (
    <div className="action-panel">
      <div className="validation-section">
        {selectedOp && selectedLots.length === 0 && (
          <div className="alert warning">
            <span>⚠️</span>
            <div>
              <strong>Aucun lot sélectionné</strong>
              <p>Veuillez sélectionner au moins un lot avant d'enregistrer</p>
            </div>
          </div>
        )}
        
        {selectedLots.length > 0 && (
          <div className="alert success">
            <span>✅</span>
            <div>
              <strong>Prêt à enregistrer</strong>
              <p>{selectedLots.length} lot(s) seront attribués à {selectedFournisseur.name}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="action-buttons-group">
        <button 
          className="btn-secondary"
          onClick={() => window.history.back()}
        >
          ← Retour
        </button>
        
        <div className="main-actions">
          <button 
            className="btn-cancel"
            onClick={onCancel}
          >
            Annuler
          </button>
          <button 
            className="btn-save"
            onClick={onSave}
            disabled={!selectedOp || selectedLots.length === 0}
          >
             Enregistrer l'attribution
          </button>
        </div>
      </div>
    </div>
  );
}