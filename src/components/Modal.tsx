// Modal.tsx
import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0  backdrop-blur-sm bg-opacity-50 blur-2xl"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className="
          relative z-10 rounded-2xl shadow-lg w-full max-w-md p-6
          bg-white text-gray-900 
          dark:bg-gray-900 dark:text-white
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X size={20}></X>
          </button>
        </div>

        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
