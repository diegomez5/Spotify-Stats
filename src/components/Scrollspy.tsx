import { CSSProperties, ReactNode } from "react";

interface ScrollspyProps {
	children: ReactNode;
}

const scrollspyStyle: CSSProperties = {
	width: "50vw",
	height: "90vh",
	overflow: "hidden",
	boxSizing: "border-box",
	padding: "20px",
	borderRight: "1px solid #ccc",
	fontFamily: "Arial, sans-serif",
	overflowY: "scroll",
};

const Scrollspy: React.FC<ScrollspyProps> = ({ children }: ScrollspyProps) => {
	return <div style={scrollspyStyle}>{children}</div>;
};

export default Scrollspy;
