interface ButtonProps{
	onClick: (e: React.MouseEvent) => void;
	children: string;
	left?: number;
  	top?: number;
	active?: boolean;
}


const Button = ({ onClick, children, left, top, active=true }: ButtonProps) => {
	const positionStyle = {
		position: 'absolute' as 'absolute',
		left: `${left}%`,
		top: `${top}%`,
	};

	return (
		<button type="button" className={`btn btn-dark ${active ? "" : "disabled"}`} onClick={onClick} style={positionStyle}>
			{children}
		</button>
	);
};

export default Button;