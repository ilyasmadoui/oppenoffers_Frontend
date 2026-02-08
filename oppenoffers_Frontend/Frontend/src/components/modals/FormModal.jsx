import { X } from "lucide-react";

export function FormModal({
  isOpen,
  onClose,
  onSave,
  title,
  children,
  saveText = "Ajouter",
  cancelText = "Annuler",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-lg mx-4 max-h-[90vh] flex flex-col overflow-hidden animate-modal-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-slate-50 to-white border-b bg-slate-50 ">
          <h3 className="text-sm font-semibold text-slate-700 truncate">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-blue-100 hover:text-blue-600 transition text-blue-500 cursor-pointer"
            aria-label="Fermer le modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-white">
          {children}
        </div>
        {/* Footer */}
        <div className="flex gap-3 justify-end px-6 py-4 border-t bg-slate-50">
          <div className="flex-1 flex">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded text-sm font-medium cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-100 transition ml-0"
            >
              {cancelText}
            </button>
          </div>
          {saveText.length !== 0 && (
            <button
              onClick={onSave}
              className="px-6 py-2 rounded text-sm font-bold bg-slate-700 cursor-pointer text-white shadow hover:bg-slate-800 transition"
            >
              {saveText}
            </button>
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes modal-fade-up {
            from { opacity: 0; transform: translateY(32px) scale(0.96);}
            to { opacity: 1; transform: translateY(0) scale(1);}
          }
          .animate-modal-fade-up {
            animation: modal-fade-up 0.25s cubic-bezier(0.4,0,0.2,1);
          }
        `}
      </style>
    </div>
  );
}
