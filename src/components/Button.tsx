import React from 'react';

interface ButtonProps {
    onClick: (e: React.MouseEvent) => void;
    children: string;
    left?: number;
    top?: number;
    width?: number;
    active?: boolean;
}

const Button = ({ onClick, children, left, top, width, active = true }: ButtonProps) => {
    const positionStyle: React.CSSProperties = {
        position: (left !== undefined && top !== undefined) ? 'absolute' : undefined,
        left: left !== undefined ? `${left}%` : undefined,
        top: top !== undefined ? `${top}%` : undefined,
        width: width !== undefined ? `${width}%` : undefined,
    };

    return (
        <button
            type="button"
            className={`btn btn-dark ${active ? "" : "disabled"}`}
            onClick={onClick}
            style={positionStyle}
        >
            {children}
        </button>
    );
};

export default Button;
