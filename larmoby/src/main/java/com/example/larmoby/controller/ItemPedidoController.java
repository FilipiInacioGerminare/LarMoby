package com.example.larmoby.controller;

import com.example.larmoby.model.ItemPedido;
import com.example.larmoby.service.ItemPedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itens-pedido")
@Tag(name = "Itens de Pedido", description = "API para gerenciamento de itens de pedido")
public class ItemPedidoController {

    @Autowired
    private ItemPedidoService itemPedidoService;

    @GetMapping("/pedido/{idPedido}")
    @Operation(summary = "Buscar itens de um pedido")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de itens retornada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Pedido não encontrado")
    })
    public List<ItemPedido> getItensByPedidoId(
        @Parameter(description = "ID do pedido") @PathVariable int idPedido
    ) {
        return itemPedidoService.findItensComProdutoByPedidoId(idPedido);
    }
} 