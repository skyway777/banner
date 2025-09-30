import type { PropsWithChildren } from "react";
import './Button.css';

interface Props extends PropsWithChildren {
    type: 'primary' | 'neutral' | 'ghost';
    className?: string;
    ariaLabel?: string;
    onClick?: () => void;
}

export const Button = ({ type, className = '', children, ariaLabel = '', onClick}: Props) => {
    return <button
        className={`btn btn--${type} ${className}`}
        aria-label={ariaLabel}
        onClick={onClick}
    >
        {children}
    </button>
}