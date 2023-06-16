import logo from '../assets/logo.png'
import { styled } from 'styled-components'

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;
    background-color: #DFDFE3;
    color: white;
    width: 100%
`

const ListOfLinks = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    width: 250px
`

const Navbar = () => {
    return (
        <div>
            <Nav>
                <div>
                    <img src={logo} alt='logo' />
                </div>
                <div>
                    <nav>
                        <ListOfLinks>
                            <li>Home</li>
                            <li>Blog</li>
                            <li>Lab Test</li>
                        </ListOfLinks>
                    </nav>
                    <div></div>
                </div>
            </Nav>
        </div>
    )
}

export default Navbar;