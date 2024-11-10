import { CSSProperties, ReactNode } from "react";

interface ScrollspyProps {
	children: ReactNode;
	height: number;

}


const Scrollspy: React.FC<ScrollspyProps> = ({ children, height }: ScrollspyProps) => {
	const scrollspyStyle: CSSProperties = {
		width: "50vw",
		height: height + "vh",
		overflow: "hidden",
		boxSizing: "border-box",
		padding: "20px",
		borderRight: "1px solid #ccc",
		fontFamily: "Arial, sans-serif",
		overflowY: "scroll",
	};

	return <div style={scrollspyStyle}>{children}</div>;
};

export default Scrollspy;
