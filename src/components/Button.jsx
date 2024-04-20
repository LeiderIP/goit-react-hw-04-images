import React from 'react';
import { Triangle } from 'react-loader-spinner';

const Button = ({ onClick, isLoading }) => {
  return (
    <div className="center-button">
      <button
        className="button button-load"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <Triangle type="ThreeDots" color="#ffffff" height={20} width={20} />
        ) : (
          'Load more'
        )}
      </button>
    </div>
  );
};

export default Button;
