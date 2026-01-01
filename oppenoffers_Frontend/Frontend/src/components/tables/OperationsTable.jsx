import { useState, useEffect } from "react";
import { Trash2, UserPlus, FileSearch } from "lucide-react";
import { Pagination } from "../tools/Pagination";
import { ConfirmDeleteModal } from "../tools/DeleteConfirmation"; 


export function OperationsTable({ operations, handleOpenSupplierModal, handleDeleteOperation, handleOpenDetailsModal }) {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentOperations = operations.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(operations.length / rowsPerPage);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedOperationNum, setSelectedOperationNum] = useState(null);

    const openDeleteModal = (numOperation) => {
        setSelectedOperationNum(numOperation);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (selectedOperationNum !== null) {
            handleDeleteOperation(selectedOperationNum);
            setSelectedOperationNum(null);
            setShowDeleteModal(false);
        }
    };
    

    const getOperationId = (operation) => {
        return operation.Id || operation.id || operation.NumOperation;
    };

    return (
        <div>
            <div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">Numéro</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Service</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Objet</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Statut</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOperations.map((op, index) => (
                            <tr key={op.NumOperation} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{op.NumOperation}</td>
                                <td className="border border-gray-300 px-4 py-2">{op.ServiceDeContract}</td>
                                <td className="border border-gray-300 px-4 py-2">{op.Objectif}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                                        {op.State}
                                    </span>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => handleOpenDetailsModal(op)}
                                            className="text-gray-600 hover:text-gray-800"
                                            title="Voir détails"
                                        >
                                            <FileSearch className="w-5 h-5" />
                                        </button>
                                        
                                        <button
                                            onClick={() => handleOpenSupplierModal(getOperationId(op))}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Ajouter fournisseur"
                                        >
                                            <UserPlus className="w-5 h-5" />
                                        </button>

                                        <button
                                            onClick={() => openDeleteModal(op.NumOperation)}
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
            </div>

            {/* Pagination */}
            <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                handlePageChange={setCurrentPage} 
            />

            {/* Modal de confirmation */}
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Supprimer opération"
                message="Êtes-vous sûr de vouloir supprimer cette opération ?"
            />
        </div>
    );
}