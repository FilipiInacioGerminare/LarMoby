package com.example.larmoby.controller;

import com.example.larmoby.model.Produto;
import com.example.larmoby.service.ProdutoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@Tag(name = "Produtos", description = "API para gerenciamento de produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping("/inserir")
    @Operation(summary = "Inserir um novo produto")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Produto inserido com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    public Produto inserirProduto(@RequestBody Produto produto) {
        return produtoService.inserirProduto(produto);
    }

    @GetMapping
    @Operation(summary = "Listar todos os produtos")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de produtos retornada com sucesso")
    })
    public List<Produto> listarProdutos() {
        return produtoService.listarProdutos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar produto por ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Produto encontrado"),
        @ApiResponse(responseCode = "404", description = "Produto não encontrado")
    })
    public Produto buscarProduto(@Parameter(description = "ID do produto") @PathVariable int id) {
        return produtoService.buscarProduto(id);
    }

    @PutMapping("/atualizar/{id}")
    @Operation(summary = "Atualizar um produto")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Produto atualizado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Produto não encontrado")
    })
    public Produto atualizarProduto(
        @Parameter(description = "ID do produto") @PathVariable int id,
        @RequestBody Produto produto
    ) {
        return produtoService.atualizarProduto(id, produto);
    }

    @DeleteMapping("/deletar/{id}")
    @Operation(summary = "Deletar um produto")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Produto deletado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Produto não encontrado")
    })
    public void deletarProduto(@Parameter(description = "ID do produto") @PathVariable int id) {
        produtoService.deletarProduto(id);
    }
}
