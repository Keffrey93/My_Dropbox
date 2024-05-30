import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" 
      role="dialog" 
      aria-labelledby="loading"
      aria-modal="true"
    >
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}

export default Loader;
