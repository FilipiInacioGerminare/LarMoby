package com.example.larmoby.controller;

import com.example.larmoby.model.Endereco;
import com.example.larmoby.service.EnderecoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController {
    private final EnderecoService enderecoService;

    public EnderecoController(EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }

    @GetMapping
    public List<Endereco> getEnderecos() {
        return enderecoService.getEnderecos();
    }

    @PostMapping("/inserir")
    public ResponseEntity<String> inserir(@RequestBody Endereco endereco) {
        enderecoService.inserir(endereco);
        return ResponseEntity.ok("Endereço inserido com sucesso!");
    }

    @PutMapping("/atualizar")
    public ResponseEntity<String> atualizar(@RequestBody Endereco endereco) {
        enderecoService.atualizar(endereco);
        return ResponseEntity.ok("Endereço atualizado com sucesso!");
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletar(@PathVariable Long id) {
        enderecoService.deletar(id);
        return ResponseEntity.ok("Endereço deletado com sucesso!");
    }
}
