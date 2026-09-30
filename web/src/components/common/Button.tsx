import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-space-sm py-1 text-label-sm rounded-lg h-8',
      md: 'px-space-md py-2 text-label-lg rounded-xl h-10',
      lg: 'px-space-lg py-2.5 text-headline-md rounded-xl h-11',
    };

    const variantClasses = {
      primary:
        'bg-primary-container text-on-primary-container font-semibold hover:bg-primary-fixed-dim active:scale-[0.98] shadow-[0_2px_8px_rgba(255,195,0,0.35)] hover:shadow-[0_4px_16px_rgba(255,195,0,0.45)]',
      secondary:
        'bg-surface-container-lowest text-on-surface border border-outline-variant/30 hover:bg-surface-container hover:border-outline-variant active:scale-[0.98] shadow-xs',
      accent:
        'bg-tertiary text-on-tertiary hover:bg-tertiary/90 active:scale-[0.98] shadow-sm',
      outline:
        'bg-transparent border border-outline-variant text-on-surface hover:bg-surface-container-low active:scale-[0.98]',
      ghost:
        'bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low',
      danger:
        'bg-error text-on-error hover:bg-error/90 active:scale-[0.98] shadow-sm',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 font-plus-jakarta transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="material-symbols-outlined text-[18px] animate-spin">
            progress_activity
          </span>
        )}
        {!isLoading && icon && iconPosition === 'left' && (
          <span className="material-symbols-outlined text-[18px] shrink-0">{icon}</span>
        )}
        {children}
        {!isLoading && icon && iconPosition === 'right' && (
          <span className="material-symbols-outlined text-[18px] shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
