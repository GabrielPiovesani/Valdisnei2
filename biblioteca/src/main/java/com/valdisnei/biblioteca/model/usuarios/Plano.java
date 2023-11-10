package com.valdisnei.biblioteca.model.usuarios;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
public class Plano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private BigDecimal preco;
    private String descricao;
    private boolean ativo;

    @OneToMany(mappedBy = "plano")
    private List<Usuario> usuarios;


}
