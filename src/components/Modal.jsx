import React from "react";

const Modal = ({ show, title, content, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="mb-4">{content}</div>
        {onClose && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
