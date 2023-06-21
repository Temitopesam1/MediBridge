import React from 'react';
import styled from 'styled-components';

const Head = styled.main`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 50vw;
    top: 0;
`;

const Header = () => {
    return (
        <Head>
            <h3>MediBridge</h3>
            <p>Your one-stop App for all your medical needs</p>
        </Head>
    );
}

export default Header;