interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity flex items-center justify-center z-50">
      <div className="bg-white p-8 brutalist-border brutalist-shadow max-w-sm w-full">
        <h2 className="text-2xl font-black uppercase mb-4">{title}</h2>
        <p className="text-lg mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-500 text-white font-bold uppercase brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-red-600 text-white font-bold uppercase brutalist-border brutalist-shadow transition-all hover:translate-x-1 hover:translate-y-1"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
