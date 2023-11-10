import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import logo from '../../assets/img/Logo.png';
import AuthContext from '../AuthContext/AuthContext.jsx';

export default function Header() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        // Realize qualquer lógica de logout necessária (por exemplo, limpar o token de autenticação)
        dispatch({ type: 'LOGOUT' }); // Atualize o estado de autenticação para não autenticado
        navigate('/login'); // Navegue para a página de login
    };

    return (
        <div>
            <Navbar className='d-flex' style={{ backgroundColor: '#000000', boxShadow: '5 5px 10px rgba(0,0,0,0.5)' }} expand="lg">
                <Navbar.Brand>
                    <img
                        src={logo}
                        width="100"
                        height="40"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link style={{ color: 'white', fontSize: '20px' }} href="/home">Biblioteca</Nav.Link>
                        <Nav.Link style={{ color: 'white', fontSize: '20px' }} href="/mediaplayer">Minhas Playlists</Nav.Link>
                    </Nav>
                    {state.isAuthenticated ? (
                        <div className="d-flex align-items-center">
                            <p style={{ color: 'white', marginRight: '10px' }}>Bem-vindo, {state.user}!</p>
                            <Button onClick={handleLogout} variant="primary">Sair</Button>
                        </div>
                    ) : (
                        <Link to="/login" style={{ color: 'white' }}>
                            <Button variant="primary">Login</Button>
                        </Link>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
