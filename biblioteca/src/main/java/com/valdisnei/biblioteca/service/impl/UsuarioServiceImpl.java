package com.valdisnei.biblioteca.service.impl;

import com.valdisnei.biblioteca.dtos.usuarios.LoginDTO;
import com.valdisnei.biblioteca.dtos.usuarios.UsuarioDTO;
import com.valdisnei.biblioteca.exception.CredenciaisInvalidasException;
import com.valdisnei.biblioteca.exception.EmailEmUsoException;
import com.valdisnei.biblioteca.mappers.UsuarioMapper;
import com.valdisnei.biblioteca.model.usuarios.Usuario;
import com.valdisnei.biblioteca.repository.usuarios.UsuarioRepository;
import com.valdisnei.biblioteca.service.UsuarioService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ModelMapper modelMapper; // Você pode usar uma biblioteca como o ModelMapper para fazer a conversão.

    public UsuarioDTO loginUsuario(LoginDTO loginDTO) {
        UsuarioDTO user = usuarioRepository.findUsuarioDTOByEmail(loginDTO.getEmail());
        if (user != null && user.getSenha().equals(loginDTO.getSenha())) {
            String nomeDoUsuario = user.getNome();
            user.setNome(nomeDoUsuario);


            return user;
        }
        else {
            throw new CredenciaisInvalidasException("Credenciais inválidas");
        }
    }


    @Override
    public UsuarioDTO criarUsuario(UsuarioDTO usuarioDTO) {

        Usuario usuario = UsuarioMapper.toEntity(usuarioDTO); // Converte DTO em entidade

        if (usuarioRepository.existsByEmail(usuarioDTO.getEmail())) {
            throw new EmailEmUsoException("Email já está em uso");
        }


        usuario.setId(usuarioDTO.getId());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setNome(usuarioDTO.getNome());
        usuario.setSenha(usuario.getSenha());

        usuario = usuarioRepository.save(usuario);

        // Lógica para criar um usuário usando a entidade 'usuario'
        UsuarioDTO novoUsuarioDTO = UsuarioMapper.toDTO(usuario); // Converte a entidade em DTO


        return novoUsuarioDTO;
    }


    @Override
    public UsuarioDTO buscarUsuarioPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null); // Busca a entidade
        return UsuarioMapper.toDTO(usuario); // Converte a entidade em DTO
    }


    @Override
    public UsuarioDTO atualizarUsuario(Long id, UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null); // Busca a entidade
        if (usuario != null) {
            UsuarioMapper.updateEntityFromDTO(usuario, usuarioDTO); // Atualiza a entidade com base no DTO
            // Lógica para atualizar o usuário usando a entidade 'usuario'
            UsuarioDTO usuarioAtualizadoDTO = UsuarioMapper.toDTO(usuario); // Converte a entidade atualizada em DTO
            return usuarioAtualizadoDTO;
        } else {
            return null; // Tratamento de erro se o usuário não for encontrado
        }
    }


    @Override
    public boolean deletarUsuario(Long id) {
        usuarioRepository.deleteById(id); // Exclui o usuário do banco de dados
        return false;
    }


    public boolean isEmailAlreadyInUse(String email) {
        return usuarioRepository.existsByEmail(email);
    }


}

