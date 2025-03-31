import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType; // Allow rendering as different elements (e.g., 'article', 'div')
}

const Card: React.FC<CardProps> = ({ children, className = '', as: Component = 'div' }) => {
  const baseStyles = 'bg-white rounded-lg shadow-md overflow-hidden border border-gray-200'; // Added border

  const combinedClassName = `${baseStyles} ${className}`;

  return (
    <Component className={combinedClassName}>
      {children}
    </Component>
  );
};

// Optional: Define sub-components for structure if needed often
const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-4 border-b border-gray-200 ${className}`}>{children}</div>
);

const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardFooter: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-4 border-t border-gray-200 bg-muted ${className}`}>{children}</div>
);

export { Card, CardHeader, CardContent, CardFooter };