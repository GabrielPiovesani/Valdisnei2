package com.valdisnei.biblioteca.service.impl;

import com.valdisnei.biblioteca.dtos.planos.PlanoDTO;
import com.valdisnei.biblioteca.service.PlanoService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlanoServiceImpl implements PlanoService {

    private List<PlanoDTO> planos = new ArrayList<>(); // Uma lista simples para armazenar os planos

    @Override
    public List<PlanoDTO> listarPlanos() {
        return planos;
    }

    @Override
    public PlanoDTO criarPlano(PlanoDTO planoDTO) {
        planos.add(planoDTO);
        return planoDTO;
    }

    @Override
    public PlanoDTO atualizarPlano(Long id, PlanoDTO planoDTO) {
        Optional<PlanoDTO> planoExistente = planos.stream()
                .filter(plano -> plano.getId().equals(id))
                .findFirst();

        if (planoExistente.isPresent()) {
            PlanoDTO planoAtualizado = planoExistente.get();
            // Atualize os campos do planoAtualizado com os valores de planoDTO
            planoAtualizado.setNome(planoDTO.getNome());
            planoAtualizado.setDescricao(planoDTO.getDescricao());
            return planoAtualizado;
        } else {
            return null; // Plano não encontrado
        }
    }

    @Override
    public boolean excluirPlano(Long id) {
        planos.removeIf(plano -> plano.getId().equals(id));
        return false;
    }
}
