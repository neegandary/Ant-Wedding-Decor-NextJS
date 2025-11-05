'use client';

import { useState, useEffect } from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'Xác nhận', cancelText = 'Hủy', type = 'danger' }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      document.body.style.overflow = 'unset';
      onClose();
      setIsClosing(false);
    }, 200);
  };

  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
    warning: {
      icon: (
        <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      confirmButton: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    },
    info: {
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    },
  };

  const currentStyle = typeStyles[type] || typeStyles.danger;

  return (
    <div className={`fixed inset-0 z-[9999] overflow-y-auto transition-all duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full transition-all duration-300 transform ${
            isClosing 
              ? 'scale-95 opacity-0 translate-y-4' 
              : 'scale-100 opacity-100 translate-y-0'
          }`}
          style={{
            animation: isClosing ? 'none' : 'modalEnter 0.3s ease-out'
          }}
        >
          {/* Icon with bounce animation */}
          <div className="flex justify-center pt-8 pb-4">
            <div className={`${isClosing ? '' : 'animate-bounce-in'}`}>
              {currentStyle.icon}
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-6 text-center">
            <h3 className={`text-2xl font-bold text-gray-900 mb-3 transition-all duration-300 delay-100 ${
              isClosing ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}>
              {title}
            </h3>
            <p className={`text-gray-600 text-sm leading-relaxed whitespace-pre-line transition-all duration-300 delay-150 ${
              isClosing ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}>
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className={`flex gap-3 px-8 pb-8 transition-all duration-300 delay-200 ${
            isClosing ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}>
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                handleClose();
              }}
              className={`flex-1 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 ${currentStyle.confirmButton}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalEnter {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
