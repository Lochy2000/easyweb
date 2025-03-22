
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  shine?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      className,
      isLoading = false,
      icon,
      iconPosition = 'left',
      shine = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = "relative inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-primary bg-transparent text-primary hover:bg-primary/10",
      ghost: "text-primary hover:bg-primary/10 hover:text-primary",
    };
    
    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-6 text-lg",
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          shine && "btn-shine",
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          </div>
        )}
        <span
          className={cn(
            "flex items-center gap-2",
            isLoading && "opacity-0"
          )}
        >
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
