import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-6 py-2 rounded-full bg-primary text-white font-semibold shadow-md hover:bg-secondary transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
