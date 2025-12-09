// FournisseursPage.jsx
import { useState } from "react";
import '../../styles/pagesStyles/Selection_Oper_Fours.css';
import FournisseurInfo from '../components/SuppliersFolder/FournisseurInfo';
import OperationsList from '../components/SuppliersFolder/OperationsList';
import LotsSelection from '../components/SuppliersFolder/LotsSelection';
import ActionPanel from '../components/SuppliersFolder/ActionPanel';
import { initialOperations, selectedFournisseur } from '../data/mockData';

export default function FournisseursPage() {
  const [operations, setOperations] = useState(initialOperations);
  const [selectedOp, setSelectedOp] = useState(null);
  const [selectedLots, setSelectedLots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSave = () => {
    if (!selectedOp || selectedLots.length === 0) {
      alert("Veuillez sélectionner au moins un lot");
      return;
    }

    setOperations(prev => 
      prev.map(op => {
        if (op.id === selectedOp) {
          const totalAvailableLots = op.lots.filter(lot => lot.available).length;
          const allAvailableLotsSelected = 
            totalAvailableLots > 0 &&
            selectedLots.length === totalAvailableLots;
          
          const updatedLots = op.lots.map(lot => ({
            ...lot,
            available: selectedLots.includes(lot.id) ? false : lot.available
          }));

          return {
            ...op,
            completed: allAvailableLotsSelected,
            lots: updatedLots
          };
        }
        return op;
      })
    );

    const opName = operations.find(op => op.id === selectedOp)?.name;
    const lotNames = selectedLots.map(id => {
      const op = operations.find(o => o.id === selectedOp);
      return op?.lots.find(l => l.id === id)?.name;
    }).join(", ");
    
    alert(`✅ Attribution enregistrée avec succès!\n\nOpération: ${opName}\nLots attribués: ${lotNames}\nTotal: ${selectedLots.length} lot(s)`);
    
    setSelectedOp(null);
    setSelectedLots([]);
  };

  const handleCancel = () => {
    if (selectedLots.length > 0 || selectedOp) {
      if (window.confirm("Voulez-vous vraiment annuler ? Les sélections seront perdues.")) {
        setSelectedOp(null);
        setSelectedLots([]);
        alert("Sélection annulée");
      }
    } else {
      setSelectedOp(null);
      setSelectedLots([]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const toggleOp = (opId) => {
    if (selectedOp === opId) {
      setSelectedOp(null);
      setSelectedLots([]);
    } else {
      setSelectedOp(opId);
      setSelectedLots([]);
    }
  };

  const toggleLot = (lotId) => {
    const op = operations.find(o => o.id === selectedOp);
    const lot = op?.lots.find(l => l.id === lotId);
    
    if (!lot || !lot.available) return;

    setSelectedLots(prev => {
      if (prev.includes(lotId)) {
        return prev.filter(id => id !== lotId);
      } else {
        return [...prev, lotId];
      }
    });
  };

  const selectAllLots = () => {
    if (!selectedOp) return;
    
    const op = operations.find(o => o.id === selectedOp);
    const availableLotIds = op.lots
      .filter(lot => lot.available)
      .map(lot => lot.id);
    setSelectedLots(availableLotIds);
  };

  const deselectAllLots = () => {
    setSelectedLots([]);
  };

  const selectedOperation = operations.find(op => op.id === selectedOp);
  const filteredOperations = searchTerm 
    ? operations.filter(op => 
        op.id.toString().includes(searchTerm) || 
        op.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : operations;
  
  const availableOperations = operations.filter(op => !op.completed).length;
  const totalOperations = operations.length;

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="header-content">
          <h1>📋 Attribution des lots</h1>
          <p className="subtitle">Sélection manuelle des opérations et lots pour le fournisseur</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{availableOperations}/{totalOperations}</span>
            <span className="stat-label">Opérations dispo.</span>
          </div>
        </div>
      </header>

      <div className="selection-container">
        <FournisseurInfo fournisseur={selectedFournisseur} />
        
        <div className="right-panel">
          <OperationsList
            operations={filteredOperations}
            selectedOp={selectedOp}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={clearSearch}
            onToggleOp={toggleOp}
          />
          
          <LotsSelection
            selectedOp={selectedOp}
            selectedOperation={selectedOperation}
            selectedLots={selectedLots}
            onToggleLot={toggleLot}
            onSelectAll={selectAllLots}
            onDeselectAll={deselectAllLots}
          />
          
          <ActionPanel
            selectedOp={selectedOp}
            selectedLots={selectedLots}
            selectedFournisseur={selectedFournisseur}
            selectedOperation={selectedOperation}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}