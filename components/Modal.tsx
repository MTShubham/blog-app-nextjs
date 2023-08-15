import React from 'react'

const Modal = ({ children, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white z-10 rounded-lg p-6 shadow-md relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M14.348 5.065a1 1 0 011.415 1.415L11.414 10l4.35 4.52a1 1 0 11-1.415 1.414L10 11.415l-4.349 4.52a1 1 0 11-1.415-1.414L8.586 10 4.237 5.48a1 1 0 111.415-1.414L10 8.585l4.349-4.52z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="text-center py-5">
            {children}
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;