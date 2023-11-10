package com.valdisnei.biblioteca.repository.usuarios;

import com.valdisnei.biblioteca.model.usuarios.Plano;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanoRepository extends JpaRepository<Plano,Long> {
}
