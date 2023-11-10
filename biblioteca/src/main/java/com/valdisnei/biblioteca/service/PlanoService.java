package com.valdisnei.biblioteca.service;

import com.valdisnei.biblioteca.dtos.planos.PlanoDTO;

import java.util.List;

public interface PlanoService {

    List<PlanoDTO> listarPlanos();
    PlanoDTO criarPlano(PlanoDTO planoDTO);
    PlanoDTO atualizarPlano(Long id, PlanoDTO planoDTO);
    boolean excluirPlano(Long id);
}
