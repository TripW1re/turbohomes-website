import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string; // For linking/navigation
  as?: React.ElementType; // Allow rendering as different elements (e.g., 'section', 'div')
  container?: boolean; // Whether to wrap content in a standard container
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  as: Component = 'section',
  container = true, // Default to using a container
}) => {
  // Standard vertical padding, adjust as needed
  const baseStyles = 'py-12 md:py-16 lg:py-20';

  const combinedClassName = `${baseStyles} ${className}`;

  return (
    <Component id={id} className={combinedClassName}>
      {container ? (
        <div className="container mx-auto px-4">
          {children}
        </div>
      ) : (
        children
      )}
    </Component>
  );
};

export default Section;