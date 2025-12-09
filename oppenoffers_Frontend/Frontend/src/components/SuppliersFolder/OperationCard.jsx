// components/OperationCard.jsx
import React from 'react';

export default function OperationCard({ operation, isSelected, onToggle }) {
  const { id, name, completed, lots } = operation;
  const availableLots = lots.filter(l => l.available).length;
  const attributedLots = lots.filter(l => !l.available).length;

  return (
    <div 
      className={`operation-card ${isSelected ? 'selected' : ''} ${completed ? 'completed' : ''}`}
      onClick={() => !completed && onToggle()}
      style={{ cursor: completed ? 'not-allowed' : 'pointer' }}
    >
      <div className="op-header">
        <div className="op-checkbox">
          <input
            type="radio"
            name="operation"
            checked={isSelected}
            onChange={() => {}}
            disabled={completed}
          />
        </div>
        <div className="op-title">
          <h4>
            <span className="op-id-badge">OP-{id}</span>
            {name}
            {completed && <span className="completed-mark"> (Terminé)</span>}
          </h4>
          <div className="op-meta">
            <span className="op-status">
              {completed ? 'Terminée' : 'Disponible'}
            </span>
            <span className="lot-count-badge">
              {availableLots}/{lots.length} lots
            </span>
          </div>
        </div>
      </div>
      
      <div className="op-footer">
        <div className="progress-indicator">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${lots.length > 0 ? (attributedLots / lots.length) * 100 : 0}%` 
              }}
            ></div>
          </div>
          <span className="progress-text">
            {attributedLots} lot(s) attribué(s)
          </span>
        </div>
      </div>
    </div>
  );
}