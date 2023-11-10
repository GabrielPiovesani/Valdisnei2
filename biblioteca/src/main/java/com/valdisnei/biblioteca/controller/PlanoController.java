package com.valdisnei.biblioteca.controller;

import com.valdisnei.biblioteca.dtos.planos.PlanoDTO;
import com.valdisnei.biblioteca.service.PlanoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/planos")
public class PlanoController {



    private PlanoService planoService;

    @Autowired
    public PlanoController(PlanoService planoService) {
        this.planoService = planoService;
    }


    @Operation(summary = "Criar plano")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Plano criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Solicitação inválida"),
            @ApiResponse(responseCode = "401", description = "Plano já existe")
    })
    @PostMapping("/criar")
    public ResponseEntity<PlanoDTO> criarPlano(@Valid @RequestBody PlanoDTO planoDTO) {
        PlanoDTO novoPlano = planoService.criarPlano(planoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPlano);
    }



    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um plano por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Plano atualizado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Requisição inválida"),
            @ApiResponse(responseCode = "404", description = "Plano não encontrado")
    })
    public ResponseEntity<PlanoDTO> atualizarPlano(@PathVariable Long id, @Valid @RequestBody PlanoDTO planoDTO) {
        PlanoDTO planoAtualizado = planoService.atualizarPlano(id, planoDTO);
        if (planoAtualizado != null) {
            return ResponseEntity.ok(planoAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta um plano por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Plano excluído com sucesso"),
            @ApiResponse(responseCode = "404", description = "Plano não encontrado")
    })
    public ResponseEntity<?> deletarPlano(@PathVariable Long id) {
        boolean sucesso = planoService.excluirPlano(id);;
        if (sucesso) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

