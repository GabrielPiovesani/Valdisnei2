import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header/Header.jsx';
import CarroselPage from '../../components/Carrossel/Carrosel.jsx'
import Footer from '../../components/Footer/Footer.jsx';

export default function Home() {
    const [username, setUsername] = useState(''); // Defina o nome de usuário
    const [loggedIn, setLoggedIn] = useState(false); // Defina o status de autenticação

    return (
        <>
            <Header username={username} loggedIn={loggedIn} onLogout={handleLogout} />
            <Container >
            <CarroselPage />
            </Container>
            <Footer/>
        </>
    )



}

