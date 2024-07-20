import { ReactNode, useState, CSSProperties } from "react";

interface NavbarProps {
    headings: string[];
    children: ReactNode[];
}

const navbarStyle: CSSProperties = {
    display: "flex",
    cursor: "pointer",
};

const Navbar = ({ headings, children }: NavbarProps) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <>
            <nav style = {navbarStyle}>
                {headings.map((heading, index) => (
                    <div
                        key={index}
                        style={{ margin: '0 10px', padding: '10px', borderBottom: tabIndex === index ? '2px solid black' : 'none' }}
                        onClick={() => setTabIndex(index)}
                    >
                {heading}
            </div>
            ))}
            </nav>
            <div style={{ marginTop: '20px' }}> {children[tabIndex]} </div>
        </>
    )
}

export default Navbar;