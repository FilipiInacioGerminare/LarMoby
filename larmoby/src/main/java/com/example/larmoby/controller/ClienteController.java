package com.example.larmoby.controller;

import com.example.larmoby.model.Cliente;
import com.example.larmoby.model.LoginRequest;
import com.example.larmoby.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:3000") // Permitir requisições do frontend
@Tag(name = "Clientes", description = "API para gerenciamento de clientes")
public class ClienteController {
    private static final Logger logger = LoggerFactory.getLogger(ClienteController.class);
    @Autowired
    private ClienteService clienteService;

    @GetMapping
    @Operation(summary = "Listar todos os clientes")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de clientes retornada com sucesso")
    })
    public ResponseEntity<List<Cliente>> listarClientes() {
        return ResponseEntity.ok(clienteService.getClientes());
    }

    @PostMapping("/criarcliente")
    @Operation(summary = "Criar um novo cliente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cliente criado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    public ResponseEntity<String> criarCliente(@RequestBody Cliente cliente) {
        clienteService.criarCliente(cliente);
        return ResponseEntity.ok("Cliente cadastrado com sucesso!");
    }

    @DeleteMapping("/deletar/{id}")
    @Operation(summary = "Deletar um cliente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cliente deletado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    public ResponseEntity<String> deletarCliente(@Parameter(description = "ID do cliente") @PathVariable Integer id) {
        clienteService.deletarCliente(id);
        return ResponseEntity.ok("Cliente deletado com sucesso!");
    }

    @PutMapping("/atualizar/{id}")
    @Operation(summary = "Atualizar um cliente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cliente atualizado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    public ResponseEntity<String> atualizarCliente(
            @Parameter(description = "ID do cliente") @PathVariable int id,
            @RequestBody Cliente cliente
    ) {
        clienteService.atualizarCliente(id, cliente);
        return ResponseEntity.ok("Cliente atualizado com sucesso!");
    }

    @PostMapping("/login")
    @Operation(summary = "Autenticar um cliente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
        @ApiResponse(responseCode = "401", description = "Credenciais inválidas")
    })
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

    @PutMapping("/toggleadmin/{id}")
    @Operation(summary = "Alternar status de admin de um cliente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Status de admin alterado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Cliente não encontrado"),
        @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    public ResponseEntity<String> toggleAdminStatus(@Parameter(description = "ID do cliente") @PathVariable int id) {
        try {
            logger.info("Recebida requisição para alterar status de admin do cliente ID: {}", id);
            clienteService.toggleAdminStatus(id);
            return ResponseEntity.ok("Status de admin atualizado com sucesso!");
        } catch (IllegalStateException e) {
            logger.warn("Cliente não encontrado: {}", e.getMessage());
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            logger.error("Erro ao atualizar status de admin: {}", e.getMessage());
            return ResponseEntity.status(500).body("Erro ao atualizar status de admin: " + e.getMessage());
        }
    }
}