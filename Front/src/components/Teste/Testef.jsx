import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {FaCheck, FaEnvelope, FaTimes, FaUser} from "react-icons/fa";
import {FaLock} from "react-icons/fa6";

function Formulario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const navigate = useNavigate();
  const [feedbackType, setFeedbackType] = useState("");
  const FeedbackMessage = ({ message, type, onClose }) => {
    const iconSize = '18px'; // Defina o tamanho do ícone aqui

    return (
        <div className={`feedback-message ${type}`}
             style={{ color: type === 'success' ? 'green' : 'red',
               fontSize: '18px',
               border: '1px solid red',
               padding: '10px',
               borderRadius: '4px',
               background: 'rgba(255, 255, 255, 0.8)',
               marginBottom: '10px',
              marginTop:'10px'}}>

        {message}
          <span className="close-button" onClick={onClose} style={{ color: 'red', cursor: 'pointer', fontSize: iconSize }}>
        <FaTimes />
      </span>
        </div>
    );
  };


  const handleLogian = async (e) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      setShowFeedback(true);
      setFeedbackMsg("As senhas não coincidem.");
      return;
    }

    if (!nome || !email || !senha || !confirmSenha) {
      setShowFeedback(true);
      setFeedbackMsg("Por favor, preencha todos os campos.");
      return;
    }

    // Crie um objeto com os dados do usuário
    const userData = {
      nome: nome,
      email: email,
      senha: senha,
    };

    try {
      const response = await axios.post(
          "http://localhost:8090/usuarios/criar",
          userData
      );

      if (response.status === 201) {
        setShowFeedback(true);
        setFeedbackMsg("Cadastro realizado com sucesso!");

        // Redireciona para a página "Home" após o cadastro bem-sucedido
        navigate("/home");
      } else if (response.data) {
        setShowFeedback(true);
        setFeedbackMsg(response.data.mensagem);
      } else {
        setShowFeedback(true);
        setFeedbackMsg("Erro ao cadastrar o usuário.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setShowFeedback(true);
        setFeedbackMsg(error.response.data.mensagem);
      } else {
        console.log(error.response && error.response.data);
        setShowFeedback(true);
        setFeedbackMsg("Erro ao fazer a solicitação.");
      }
    }
  };
return (
  <div className="d-flex justify-content-center mt-5">

    <Form
        className="formCadastro p-4 m-3 text-white"
        onSubmit={handleLogian}
        style={{ background: 'linear-gradient(to right,  #272b30,#343a40)' }}
    >
      <h4 style={{ color: "#4e73df", marginBottom: "20px", textAlign: "center", fontFamily: "'Bebas Neue', sans-serif", fontWeight: "bold" }}>Criar Conta</h4>
      <div className="textcadastro" style={{ textAlign: "center", fontFamily: "Roboto, sans-serif" }}>
        <p style={{fontSize: "16px", fontWeight: "500" }}>Crie a sua única conta para todos os produtos ValDisnei</p>
      </div>


      <Form.Group controlId="nome">
        <Form.Label style={{ color: "white" }}>
          <FaUser className="mr-2" /> Nome
        </Form.Label>
        <Form.Control
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label className="mt-3" style={{ color: "white" }}>
          <FaEnvelope className="mr-2"/> Email</Form.Label>
        <Form.Control
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="senha">
        <Form.Label className="mt-3" style={{ color: "white" }}>
          <FaLock className="mr-2" /> Senha</Form.Label>
        <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="confirm-senha">
        <Form.Label className="mt-3" style={{ color: "white" }}>
          <FaLock className="mr-2" /> Confirmar senha</Form.Label>
        <Form.Control
            type="password"
            placeholder="Digite novamente sua senha"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
        />
      </Form.Group>
      {showFeedback && (
          <FeedbackMessage
              type={feedbackType}
              message={feedbackMsg}
              onClose={() => setShowFeedback(false)}
          />
      )}
      <div className="d-flex justify-content-center mt-4">
        <Button
          className="btnFormulario"
          style={{ background: "linear-gradient(to right, #4e73df, #224abe)", borderColor: "#4e73df" }}
          type="submit"
      >
        Cadastrar
      </Button>
      </div>

    </Form>

  </div>
);
} export default Formulario;