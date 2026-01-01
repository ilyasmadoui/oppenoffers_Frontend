import { Edit2, Trash2 } from 'lucide-react';
import { Pagination } from "../tools/Pagination"
import { useState } from "react";
import { ConfirmDeleteModal } from "../tools/DeleteConfirmation"; 


export function LotsTable({ lots, getOperationNumero, handleOpenModal, handleDeleteLot }) {
    
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentLots = lots.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(lots.length / rowsPerPage);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedLotId, setSelectedLotId] = useState(null);


        const openDeleteModal = (id) => {
            setSelectedLotId(id);
            setShowDeleteModal(true);
        };

        const handleConfirmDelete = () => {
            if (selectedLotId !== null) {
                handleDeleteLot(selectedLotId);
                setSelectedLotId(null);
                setShowDeleteModal(false);
            }
        };
    

    return (
        <div>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100 sticky top-0">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Numéro</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Désignation</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Opération</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentLots.map((lot) => {
                        const lotId = lot.id; 
                        return (
                            <tr key={lotId} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{lot.NumeroLot}</td>
                                <td className="border border-gray-300 px-4 py-2">{lot.Designation}</td>
                                <td className="border border-gray-300 px-4 py-2">{getOperationNumero(lot.id_Operation)}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => handleOpenModal(lot)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(lotId)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Supprimer"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Pagination */}
            <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                handlePageChange={setCurrentPage} 
            />

            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Supprimer lot"
                message="Êtes-vous sûr de vouloir supprimer cette lot ?"
            />
        </div>
    );
}
