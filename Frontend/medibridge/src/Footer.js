import React from "react";
import styled from "styled-components";

const Footerbar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 15px;
    bottom: 0;
    position: absolute;

    width: 100vw;
    height: 20vh;

    background: linear-gradient(93.44deg, #003846 0%, #04A7C3 100%);
    border-radius: 0px 0px 10px 10px;

    /* Inside auto layout */

    flex: none;
    order: 5;
    flex-grow: 0;
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