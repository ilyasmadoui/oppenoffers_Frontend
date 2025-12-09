// components/FournisseurInfo.jsx
import React from 'react';

export default function FournisseurInfo({ fournisseur }) {
  return (
    <div className="fournisseur-info">
      <div className="info-header">
        <div className="supplier-title">
          <h2>{fournisseur.name}</h2>
          <span className="supplier-badge">Fournisseur</span>
        </div>
        <span className="fournisseur-id">ID: #{fournisseur.id}</span>
      </div>
      
      <div className="info-grid">
        <div className="info-item">
          <span className="info-icon">📧</span>
          <div className="info-content">
            <label>Email</label>
            <p>{fournisseur.email}</p>
          </div>
        </div>
        
        <div className="info-item">
          <span className="info-icon">📱</span>
          <div className="info-content">
            <label>Téléphone</label>
            <p>{fournisseur.phone}</p>
          </div>
        </div>
        
        <div className="info-item">
          <span className="info-icon">🏢</span>
          <div className="info-content">
            <label>Adresse</label>
            <p>{fournisseur.address}</p>
          </div>
        </div>
        
        <div className="info-divider"></div>
        
        <div className="info-item">
          <span className="info-icon">📄</span>
          <div className="info-content">
            <label>RC / NIF</label>
            <p>{fournisseur.rc} | {fournisseur.nif}</p>
          </div>
        </div>
        
        <div className="info-item">
          <span className="info-icon">🏦</span>
          <div className="info-content">
            <label>Banque</label>
            <p>{fournisseur.bank}</p>
          </div>
        </div>
      </div>
      
      <div className="status-section">
        <div className="status-indicator active">
          <div className="status-dot"></div>
          <span>Actif</span>
        </div>
        <div className="last-update">
          Mis à jour: Aujourd'hui
        </div>
      </div>
    </div>
  );
}