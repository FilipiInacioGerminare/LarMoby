package com.example.larmoby.controller;

import com.example.larmoby.model.Produto;
import com.example.larmoby.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public List<Produto> getPedidos() {
        return produtoService.getProdutos();
    }

    @PostMapping("/inserir")
    public ResponseEntity<String> inserirProduto(@RequestBody Produto produto) {
        produtoService.inserirProduto(produto);
        return ResponseEntity.ok("Produto cadastrado com sucesso!");
    }

    @DeleteMapping("/deletar/{idProduto}")
    public ResponseEntity<String> deletarProduto(@PathVariable Long idProduto) {
        produtoService.deletarProduto(idProduto);
        return ResponseEntity.ok("Produto deletado com sucesso!");
    }

    @PutMapping("/atualizar")
    public ResponseEntity<String> atualizarProduto(@RequestBody Produto produto) {
        produtoService.atualizarProduto(produto);
        return ResponseEntity.ok("Produto atualizado com sucesso!");
    }
}
