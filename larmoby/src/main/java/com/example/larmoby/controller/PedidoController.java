package com.example.larmoby.controller;

import com.example.larmoby.model.Pedido;
import com.example.larmoby.model.ItemPedido;
import com.example.larmoby.service.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/pedidos")
@Tag(name = "Pedidos", description = "API para gerenciamento de pedidos")
@CrossOrigin(origins = "http://localhost:3000")
public class PedidoController {
    private final PedidoService pedidoService;

    @Autowired
    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    @Operation(summary = "Listar todos os pedidos")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de pedidos retornada com sucesso")
    })
    public List<Pedido> getPedidos() {
        return pedidoService.getPedidos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar pedido por ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pedido encontrado"),
        @ApiResponse(responseCode = "404", description = "Pedido não encontrado")
    })
    public ResponseEntity<Pedido> buscarPedidoPorId(@Parameter(description = "ID do pedido") @PathVariable int id) {
        Pedido pedido = pedidoService.buscarPedidoPorId(id);
        if (pedido != null) {
            return ResponseEntity.ok(pedido);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/buscarpedido/{id}")
    @Operation(summary = "Listar pedidos de um cliente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de pedidos retornada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    public List<Pedido> buscarPedidoPorCliente(@Parameter(description = "ID do cliente") @PathVariable int id) {
        return pedidoService.buscarPedidoPorCliente(id);
    }

    @GetMapping("/itens/{id}")
    public List<ItemPedido> buscarItensPedido(@PathVariable int id) {
        return pedidoService.buscarItensPedido(id);
    }

    @PostMapping("/inserir")
    @Operation(summary = "Criar um novo pedido")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pedido criado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    public ResponseEntity<Pedido> inserirPedido(@RequestBody Map<String, Object> pedidoData) {
        Pedido pedido = pedidoService.inserirPedido(pedidoData);
        return ResponseEntity.ok(pedido);
    }

    @PostMapping("/cancelar/{id}")
    @Operation(summary = "Cancelar um pedido")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pedido cancelado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Pedido não encontrado")
    })
    public ResponseEntity<String> cancelarPedido(@Parameter(description = "ID do pedido") @PathVariable int id) {
        pedidoService.cancelarPedido(id);
        return ResponseEntity.ok("Pedido cancelado com sucesso.");
    }

    @PutMapping("/atualizar/{id}")
    @Operation(summary = "Atualizar um pedido")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pedido atualizado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Pedido não encontrado")
    })
    public Pedido atualizarPedido(
        @Parameter(description = "ID do pedido") @PathVariable int id,
        @RequestBody Pedido pedido
    ) {
        return pedidoService.atualizarPedido(id, pedido);
    }

    @DeleteMapping("/deletar/{id}")
    @Operation(summary = "Deletar um pedido")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pedido deletado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Pedido não encontrado")
    })
    public void deletarPedido(@Parameter(description = "ID do pedido") @PathVariable int id) {
        pedidoService.deletarPedido(id);
    }
}
