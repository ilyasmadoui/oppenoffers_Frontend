import { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { FileText } from 'lucide-react';
import { deleteRetrait } from '../../services/Retrait Cahier de charge/retraitService';
import { SpecificationsTable } from './SpecificationsTable';
import { useToast } from '../../hooks/useToast';
import { SectionsModal } from "../Shared/SectionsModal";
import {SupplierModals} from '../Suppliers/SupplierModals';

export function SpecificationsSection({ operationID, Specifications, refreshData }) {

  useEffect(()=>{
    console.log('Operation ID In SpecificationSection.jsx : ', operationID);
    console.log('Operation ID In SpecificationSection.jsx : ', Specifications);
  },[])
  const { user } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteRetrait = async (supplierId) => {
    try {
      // Use the operationID from props instead of passing it as parameter
      const response = await deleteRetrait(supplierId, operationID);
      console.log('Delete response:', response);

      if (response.success) {
        showToast(response.message || 'Retrait supprimé avec succès', 'success');
        refreshData(); 
      } else {
        if (response.code === 1002) {
          showToast('Aucun retrait trouvé pour cette opération et fournisseur', 'warning');
        } else {
          showToast(response.message || 'Erreur lors de la suppression', 'error');
        }
      }
    } catch (error) {
      console.error('Error in handleDeleteRetrait:', error);
      showToast('Erreur de connexion au serveur', 'error');
    }
  };

  if (loading) {
    return <div className="p-8">Chargement des données...</div>;
  }


  return (
    <>
      <SectionsModal
          title="Retrait des Cahiers de Charges"
          icon={<FileText className="w-4 h-4" />}
          buttonText="Nouveau Retrait"
          showSearch={false}
          showFilter={false}
          onButtonClick={() => {
            showToast('Fonctionnalité d\'ajout de retrait non implémentée.', 'info');
          }}
          showButton={true}
        >
          <SpecificationsTable
            specifications={Specifications || []}
            handleDeleteRetrait={handleDeleteRetrait}
            operationID={operationID}
          />
        </SectionsModal>

          <SupplierModals
            showSupplierModal={showModal}
            setShowSupplierModal={setShowModal}
          />
    </>
      
       
  );
}