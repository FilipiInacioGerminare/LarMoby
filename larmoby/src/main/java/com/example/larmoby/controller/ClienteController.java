package com.example.larmoby.controller;

import com.example.larmoby.model.Cliente;
import com.example.larmoby.model.LoginRequest;
import com.example.larmoby.service.ClienteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:3000") // Permitir requisições do frontend
public class ClienteController {
    private static final Logger logger = LoggerFactory.getLogger(ClienteController.class);
    private final ClienteService clienteService;
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

    @PostMapping("/login")
    public ResponseEntity<Cliente> login(@RequestBody LoginRequest loginRequest) {
        logger.info("Recebida requisição de login para email: {}", loginRequest.getEmail());
        try {
            Cliente cliente = clienteService.autenticarCliente(loginRequest.getEmail(), loginRequest.getSenha());
            if (cliente != null) {
                logger.info("Login bem-sucedido para cliente ID: {}", cliente.getId_cliente());
                return ResponseEntity.ok(cliente);
            } else {
                logger.warn("Falha no login: email ou senha incorretos para {}", loginRequest.getEmail());
                return ResponseEntity.status(401).body(null);
            }
        } catch (Exception e) {
            logger.error("Erro ao processar login para {}: {}", loginRequest.getEmail(), e.getMessage(), e);
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/toggleadmin/{idCliente}")
    public ResponseEntity<String> toggleAdminStatus(@PathVariable int idCliente) {
        try {
            clienteService.toggleAdminStatus(idCliente);
            return ResponseEntity.ok("Status de admin atualizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar status de admin: " + e.getMessage());
        }
    }
}