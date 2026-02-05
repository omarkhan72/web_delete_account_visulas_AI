import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import "./styles.css"

interface Props {
  onClick: () => void; // Function to handle button click
  disabled?: boolean; // Optional prop for button disabled state
}

const index: React.FC<Props> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='my-btn'
    >
      <FcGoogle className="my-btn-icon" />
      Continue with Google
    </button>
  );
}

export default index;
