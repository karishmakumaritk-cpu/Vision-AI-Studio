import React from 'react';
export default function Card({title, subtitle, children, footer}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {subtitle && <div className="text-sm text-gray-500 mb-3">{subtitle}</div>}
      <div className="text-sm mb-4">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}
