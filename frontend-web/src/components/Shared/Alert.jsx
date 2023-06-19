import React from 'react';

const Alert = ({ type, children }) => {
  let alertClasses = '';

  // Aplica las clases de estilo según el tipo de alerta
  switch (type) {
    case 'success':
      alertClasses = 'bg-green-200 text-green-800';
      break;
    case 'error':
      alertClasses = 'bg-red-200 text-red-800';
      break;
    case 'warning':
      alertClasses = 'bg-yellow-200 text-yellow-800';
      break;
    default:
      alertClasses = 'bg-blue-200 text-blue-800';
  }

  return (
    <div className={`p-4 mb-1 rounded ${alertClasses}`}>
      <span className="flex gap-3">{children}</span>
    </div>
  );
};

export default Alert;