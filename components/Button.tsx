import React from 'react';
import Link from 'next/link';

// Define props specifically for the anchor tag behavior
interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string; // Make href required for AnchorProps
}

// Define props specifically for the button tag behavior
interface ButtonTagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never; // Ensure href is not passed for button behavior
}

// Combine base props with conditional props based on href presence
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
} & (AnchorProps | ButtonTagProps); // Use a union type

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props // props will now correctly contain either AnchorProps or ButtonTagProps
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
    secondary: 'bg-secondary text-primary hover:bg-secondary/90 focus:ring-secondary',
    accent: 'bg-accent text-white hover:bg-accent/90 focus:ring-accent',
    outline: 'border border-primary text-primary hover:bg-primary/10 focus:ring-primary',
    ghost: 'hover:bg-primary/10 text-primary focus:ring-primary',
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  // Check if href exists in props to determine rendering Link or button
  if ('href' in props && props.href) {
    // Destructure anchor-specific props
    const { href, ...anchorProps } = props as AnchorProps;
    return (
      // Pass down anchorProps (like target, rel) to the Link component
      <Link href={href} className={combinedClassName} {...anchorProps}>
        {children}
      </Link>
    );
  } else {
    // Cast props to ButtonTagProps for type safety
    const buttonProps = props as ButtonTagProps;
    return (
      <button className={combinedClassName} {...buttonProps}>
        {children}
      </button>
    );
  }
};

export default Button;