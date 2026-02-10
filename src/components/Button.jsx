import React from 'react';
export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition';
  const styles = {
    primary: 'bg-gradient-to-r from-primary-purple to-primary-blue text-white',
    cta: 'text-white', // will be styled inline for gradient in usage
    secondary: 'bg-white border border-gray-200 text-text-primary',
    outline: 'border border-primary-purple text-primary-purple bg-transparent'
  };
  return (
    <button className={`${base} ${styles[variant] || styles.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
