package com.valdisnei.biblioteca.dtos.usuarios;


import com.valdisnei.biblioteca.dtos.planos.PlanoDTO;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {
    private Long id;
    private String nome;
    private String senha;
    private String email;

}

