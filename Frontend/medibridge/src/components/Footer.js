import React from "react";
import './footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <h1>MediBridge</h1>
            <p>&copy; { currentYear }, MediBridge. All rights reserved</p>
        </footer>
    );
};

export default Footer;