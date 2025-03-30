package com.example.larmoby.controller;

import com.example.larmoby.model.Cliente;
import com.example.larmoby.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    @Autowired
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> listarClientes() {
        return ResponseEntity.ok(clienteService.getClientes());
    }

    @PostMapping("/criarcliente")
    public ResponseEntity<String> criarCliente(@RequestBody Cliente cliente) {
        clienteService.criarCliente(cliente);
        return ResponseEntity.ok("Cliente cadastrado com sucesso!");
    }

    @DeleteMapping("deletarcliente/{idCliente}")
    public ResponseEntity<String> deletarCliente(@PathVariable Long idCliente) {
        clienteService.deletarCliente(idCliente);
        return ResponseEntity.ok("Cliente deletado com sucesso!");
    }

    @PutMapping("atualizar/{id}")
    public ResponseEntity<String> atualizarCliente(
            @PathVariable int id,
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String email
    ) {
        clienteService.atualizarCliente(id, nome, email);
        return ResponseEntity.ok("Cliente atualizado com sucesso!");
    }
}
