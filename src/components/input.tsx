import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`
        w-full p-3 rounded-lg border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-primary
        transition ${className}
      `}
      {...props}
    />
  );
};

export default Input;

