package com.valdisnei.biblioteca.dtos.planos;

import com.valdisnei.biblioteca.dtos.usuarios.UsuarioDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlanoDTO {

    private Long id;
    private String nome;
    private BigDecimal preco;
    private String descricao;
    private boolean ativo;
    private List<UsuarioDTO> usuarios;
}
