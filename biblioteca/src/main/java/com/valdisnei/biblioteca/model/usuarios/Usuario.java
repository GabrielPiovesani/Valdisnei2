package com.valdisnei.biblioteca.model.usuarios;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String senha;

    @Column(unique = true)
    private String email;

    @ManyToOne
    @JoinColumn(name = "plano_id")
    private Plano plano;
}
