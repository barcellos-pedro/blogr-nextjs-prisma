import { Dialog } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  title,
  description,
  confirmButtonText,
  cancelButtonText,
}: ModalProps) => {
  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <Dialog.Panel className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 rounded-lg bg-white p-12 shadow-md shadow-black/50">
        <Dialog.Title className="text-center font-semibold text-zinc-600">
          {title}
        </Dialog.Title>
        <Dialog.Description className="text-center">
          {description}
        </Dialog.Description>
        <div className="flex justify-center gap-5">
          {confirmButtonText && (
            <button
              onClick={onConfirm}
              className="font-semibold bg-red-500 px-4 py-1 rounded"
            >
              {confirmButtonText}
            </button>
          )}

          {cancelButtonText && (
            <button
              onClick={onCancel}
              className="font-semibold bg-white px-4 py-1 rounded border-2 border-zinc-300"
            >
              {cancelButtonText}
            </button>
          )}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
