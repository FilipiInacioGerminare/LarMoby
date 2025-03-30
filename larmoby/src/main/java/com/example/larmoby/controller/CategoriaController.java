package com.example.larmoby.controller;

import com.example.larmoby.model.Categoria;
import com.example.larmoby.service.CategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public List<Categoria> getCategorias() {
        return categoriaService.getCategorias();
    }

    @PostMapping("/inserir")
    public ResponseEntity<String> inserir(@RequestBody Categoria categoria) {
        categoriaService.inserir(categoria);
        return ResponseEntity.ok("Categoria inserida com sucesso!");
    }

    @PutMapping("/atualizar")
    public ResponseEntity<String> atualizar(@RequestBody Categoria categoria) {
        categoriaService.atualizar(categoria);
        return ResponseEntity.ok("Categoria atualizada com sucesso!");
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletar(@PathVariable Long id) {
        categoriaService.deletar(id);
        return ResponseEntity.ok("Categoria deletada com sucesso!");
    }
}
