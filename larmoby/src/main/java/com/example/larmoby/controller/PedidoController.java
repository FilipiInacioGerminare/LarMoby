package com.example.larmoby.controller;

import com.example.larmoby.model.Pedido;
import com.example.larmoby.model.ItemPedido;
import com.example.larmoby.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:3000")
public class PedidoController {
    private final PedidoService pedidoService;

    @Autowired
    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public List<Pedido> getPedidos() {
        return pedidoService.getPedidos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPedidoPorId(@PathVariable int id) {
        Pedido pedido = pedidoService.buscarPedidoPorId(id);
        if (pedido != null) {
            return ResponseEntity.ok(pedido);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/buscarpedido/{id}")
    public List<Pedido> buscarPedidoPorCliente(@PathVariable int id) {
        return pedidoService.buscarPedidoPorCliente(id);
    }

    @GetMapping("/itens/{id}")
    public List<ItemPedido> buscarItensPedido(@PathVariable int id) {
        return pedidoService.buscarItensPedido(id);
    }

    @PostMapping("/inserir")
    public ResponseEntity<Pedido> inserirPedido(@RequestBody Map<String, Object> pedidoData) {
        Pedido pedido = pedidoService.inserirPedido(pedidoData);
        return ResponseEntity.ok(pedido);
    }

    @PostMapping("/cancelar/{id}")
    public ResponseEntity<String> cancelarPedido(@PathVariable int id) {
        pedidoService.cancelarPedido(id);
        return ResponseEntity.ok("Pedido cancelado com sucesso.");
    }
}
