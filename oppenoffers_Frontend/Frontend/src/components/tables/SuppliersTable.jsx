import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmDeleteModal } from "../tools/DeleteConfirmation"; 


export function SuppliersTable({ suppliers, handleModalOpen, handleDeleteRetrait  }) {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState({ supplierId: null, operationId: null });

  const openDeleteModal = (supplierId, operationId) => {
    console.log('openDeleteModal called with:', supplierId, operationId);
    setSelectedIds({ supplierId, operationId });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedIds.supplierId && selectedIds.operationId) {
      handleDeleteRetrait(selectedIds.supplierId, selectedIds.operationId);      
      setSelectedIds({ supplierId: null, operationId: null });
      setShowDeleteModal(false);
    }
  };

  //verifier apres delete
  const handleDeleteClick = (supplier) => {
    const supplierId = supplier.Id;
    const operationId = supplier.NumeroOperation;

    if (!supplierId || !operationId) {
      console.error('Missing data for deletion:', supplier);
      return;
    }

    openDeleteModal(supplierId, operationId);
  };

      

  return (
    <>
    <table className="w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100 sticky top-0">
        <tr className="bg-gray-100">
           <th className="border border-gray-300 px-4 py-2 text-left">Nom & Prénom</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Téléphone</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Adresse</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Opérations</th>
          <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supplier, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{supplier.NomPrenom}</td>
            <td className="border border-gray-300 px-4 py-2">{supplier.Telephone}</td>
            <td className="border border-gray-300 px-4 py-2">{supplier.Email}</td>
            <td className="border border-gray-300 px-4 py-2">{supplier.Adresse}</td>
            <td className="border border-gray-300 px-4 py-2">
              <div className="flex items-center gap-2">
                {supplier.NumeroOperation ? supplier.NumeroOperation : "—"}
              </div>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex justify-center items-center gap-2">
                    <button onClick={() => handleModalOpen(supplier)} className="text-blue-600 hover:text-blue-800"><Edit2 className="w-5 h-5" /></button>
                    <button onClick={() => handleDeleteClick(supplier)}
                            className="text-red-600 hover:text-red-800"
                            title="Supprimer"
                          >
                      <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

     {/* Modal de confirmation */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer le retrait"
        message="Êtes-vous sûr de vouloir supprimer ce retrait ?"
      />
    </>
  );
}
