package com.example.larmoby.controller;

import com.example.larmoby.model.Categoria;
import com.example.larmoby.service.CategoriaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@Tag(name = "Categorias", description = "API para gerenciamento de categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping("/inserir")
    @Operation(summary = "Inserir uma nova categoria")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Categoria inserida com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    public Categoria inserirCategoria(@RequestBody Categoria categoria) {
        return categoriaService.inserirCategoria(categoria);
    }

    @GetMapping
    @Operation(summary = "Listar todas as categorias")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de categorias retornada com sucesso")
    })
    public List<Categoria> listarCategorias() {
        return categoriaService.listarCategorias();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar categoria por ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Categoria encontrada"),
        @ApiResponse(responseCode = "404", description = "Categoria não encontrada")
    })
    public Categoria buscarCategoria(@Parameter(description = "ID da categoria") @PathVariable Long id) {
        return categoriaService.buscarCategoria(id);
    }

    @PutMapping("/atualizar/{id}")
    @Operation(summary = "Atualizar uma categoria")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Categoria atualizada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Categoria não encontrada")
    })
    public Categoria atualizarCategoria(
        @Parameter(description = "ID da categoria") @PathVariable Long id,
        @RequestBody Categoria categoria
    ) {
        return categoriaService.atualizarCategoria(id, categoria);
    }

    @DeleteMapping("/deletar/{id}")
    @Operation(summary = "Deletar uma categoria")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Categoria deletada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Categoria não encontrada")
    })
    public void deletarCategoria(@Parameter(description = "ID da categoria") @PathVariable Long id) {
        categoriaService.deletarCategoria(id);
    }
}
