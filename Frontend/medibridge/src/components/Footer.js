import React from "react";
import styled from "styled-components";

const Footerbar = styled.div`
    display: flex;
    position: relative;
    isolation: isolate;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    boxSizing: border-box;
    height: 43px;
    width: 846px;
    margin: 30px 0px 0px 0px; 
`

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <Footerbar>
            <h1>MediBridge</h1>
            <p>&copy; { currentYear }, MediBridge. All rights reserved</p>
        </Footerbar>
    );
};

export default Footer;