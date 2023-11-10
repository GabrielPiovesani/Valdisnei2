import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalogo from './pages/Catalogo/Catalogo.jsx';
import Inicio from './pages/Inicio/Inicio.jsx'
import Login from './pages/Login/Login.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Teste from './pages/Teste/Teste.jsx';
import PlaylistsPage from './pages/MinhasPlaylist/MinhaPLaylist.jsx';
import TocadorPlaylist from './pages/TocadorPlaylist/TocadorPlaylist.jsx';
import { AuthProvider } from "./components/AuthContext/AuthContext.jsx";



function App() {
    return (
        <div className="App">
            <AuthProvider> {/* Use o AuthProvider para envolver a aplicação */}
                <Router>
                    <Routes>
                        <Route path='/' element={<Inicio />} />
                        <Route path="/home" element={<Catalogo />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/playlist" element={<PlaylistsPage />} />
                        <Route path="/mediaplayer" element={<TocadorPlaylist />} />
                        <Route path="/teste" element={<Teste />} />

                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    )
}

export default App;
