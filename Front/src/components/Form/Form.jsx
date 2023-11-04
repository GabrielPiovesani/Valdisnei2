import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const Form = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const userData = {email: email, senha: senha,};

  const FormValidacao = () => {
    // Implemente a lógica de validação aqui
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Aqui você pode fazer uma solicitação para o seu back-end para autenticar o usuário
    try {
      const response = await axios.post('http://localhost:8090/usuarios/login', userData);


      if (response.status === 201) {
        console.log('login foi bem-sucedido, redirecione ou realize a ação desejada');
      } else {
        console.log('nao caiu no if');
        setEmailErr(true);
      }
    } catch (error) {
      console.error('Erro na autenticação:', error);
      setEmailErr(true);
    }
  };

  return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form className="containerLogin p-4 mb-4" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="form-group mb-4">
            <h2 style={{ color: '#ccc' }}>Login</h2>
            <label htmlFor="exampleInputEmail1" style={{ color: '#ccc' }}>Email</label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
                style={{ color: '#000' }}
            />
            {emailErr && <p style={{ color: 'red' }}>Por favor, digite um email válido!</p>}
          </div>
          <div className="form-group mb-4">
            <label style={{ color: '#ccc' }}>Senha</label>
            <input
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Senha"
                style={{ color: '#000' }}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-info" onClick={handleLogin}>Enviar</button>
          </div>
          <div className="form-group mt-4 text-center">
            <p style={{ color: '#ccc' }}>
              Não tem uma conta? <Link to="/cadastro" style={{ color: '#00A0E4' }}>Assine</Link>
            </p>
          </div>
        </form>
      </div>
  );
};

export default Form;
