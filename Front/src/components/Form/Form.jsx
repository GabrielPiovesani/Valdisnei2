import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {Alert} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';




const Form = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const userData = {email: email, senha: senha,};
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const FormValidacao = () => {
    // Implemente a lógica de validação aqui
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Aqui você pode fazer uma solicitação para o seu back-end para autenticar o usuário
    try {
      const response = await axios.post('http://localhost:8090/usuarios/login', userData);


      if (response.status === 200) {
        console.log(response.data.nome)
        navigate('/home');
        setUsername(response.data.nome);// Define loggedIn como true quando o login for bem-sucedido


      } else if(response.data) {
        setShowFeedback(true);
        setFeedbackMsg(response.data.mensagem);
        console.log(response.data.mensagem);
      }

    } catch (error) {
      if (error.response && error.response.data) {
        setShowFeedback(true);
        setFeedbackMsg(error.response.data.mensagem);
      } else {
        console.error(error);
        setShowFeedback(true);
        setFeedbackMsg("Erro ao fazer a solicitação.");
      }
  }};

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

          </div>
          {showFeedback && (
              <Alert variant={feedbackMsg.includes("sucesso") ? "success" : "danger"} onClose={() => setShowFeedback(false)} dismissible>
                {feedbackMsg.includes("sucesso") ? "Sucesso: " : "Erro: "}{feedbackMsg}
              </Alert>
          )}
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
          {loggedIn && <Redirect to="/catalago" />}
        </form>
      </div>
  );
};

export default Form;
