import React from 'react';

function ErrorMessage({ errorMessage = "Something went wrong!", isFocused = false }) {
  return (
    <span
      className={`text-red-500 text-sm font-semibold ${isFocused ? 'block' : 'hidden'
        }`}
    >
      {errorMessage}
    </span>
  );
}

export default ErrorMessage;
