package com.valdisnei.biblioteca.repository.usuarios;

import com.valdisnei.biblioteca.dtos.usuarios.UsuarioDTO;
import com.valdisnei.biblioteca.model.usuarios.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByEmail(String email);
    @Query("SELECT new com.valdisnei.biblioteca.dtos.usuarios.UsuarioDTO(u.id, u.nome, u.senha, u.email) FROM Usuario u WHERE u.email = :email")
    UsuarioDTO findUsuarioDTOByEmail(@Param("email") String email);
}
