import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | '3d';
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
    
    // For non-gradient variants
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-primary bg-transparent text-primary hover:bg-primary/10",
      ghost: "text-primary hover:bg-primary/10 hover:text-primary",
      gradient: "", // Empty because we handle this separately
      '3d': "", // Empty because we handle this separately
    };
    
    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-6 text-lg",
    };

    // For 3D perspective button variant
    if (variant === '3d') {
      return (
        <button
          ref={ref}
          className={cn(
            "relative text-white uppercase font-semibold text-sm border-none py-2 px-4 rounded-md cursor-pointer shadow-[0_3px_10px_rgba(0,0,0,0.25)] perspective-[30rem] transition-all bg-transparent overflow-hidden group",
            className
          )}
          disabled={isLoading}
          {...props}
        >
          {/* Gradient background with 3D animation */}
          <span className="absolute inset-0 rounded-md bg-gradient-to-br from-[rgba(0,140,255,0.678)] to-[rgba(128,0,128,0.308)] z-[1] transition-all duration-300 group-hover:animate-rotate-y"></span>
          
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            </div>
          )}
          
          {/* Button content */}
          <span
            className={cn(
              "relative z-10 flex items-center gap-2",
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

    // For gradient button variant
    if (variant === 'gradient') {
      return (
        <div className={cn("relative group", className)}>
          {/* Gradient background with blur effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0ce39a] via-[#69007f] to-[#fc0987] rounded-md transition-all duration-500 group-hover:blur-[20px] group-hover:opacity-100 opacity-0"></div>
          
          {/* Button with gradient background */}
          <button
            ref={ref}
            className={cn(
              "relative rounded-md bg-gradient-to-r from-[#0ce39a] via-[#69007f] to-[#fc0987] font-medium text-white",
              sizes[size],
              shine && "btn-shine"
            )}
            disabled={isLoading}
            {...props}
          >
            {/* Dark inner background that fades on hover */}
            <span className="absolute inset-[1px] rounded-[calc(0.375rem-1px)] bg-[#272727] transition-opacity duration-500 group-hover:opacity-70"></span>
            
            {/* Loading spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              </div>
            )}
            
            {/* Button content */}
            <span
              className={cn(
                "relative z-10 flex items-center gap-2",
                isLoading && "opacity-0"
              )}
            >
              {icon && iconPosition === 'left' && icon}
              {children}
              {icon && iconPosition === 'right' && icon}
            </span>
          </button>
        </div>
      );
    }
    
    // For non-gradient button variants
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
