package com.example.larmoby.controller;

import com.example.larmoby.model.Pedido;
import com.example.larmoby.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pedidos")

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

    @GetMapping("/buscarpedido/{id}")
    public List<Pedido> buscarPedidoPorCliente(@PathVariable int id) {
        return pedidoService.buscarPedidoPorCliente(id);
    }

    @PostMapping("/criarpedido/{id}")
    public ResponseEntity<String> criarPedido(@PathVariable int id) {
        pedidoService.criarPedido(id);
        return ResponseEntity.ok("Pedido criado com sucesso.");
    }

    @PostMapping("/cancelar/{id}")
    public ResponseEntity<String> cancelarPedido(@PathVariable int id) {
        pedidoService.cancelarPedido(id);
        return ResponseEntity.ok("Pedido cancelado com sucesso.");
    }
}
