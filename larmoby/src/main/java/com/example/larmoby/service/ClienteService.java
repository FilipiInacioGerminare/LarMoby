package com.example.larmoby.service;

import com.example.larmoby.model.Cliente;
import com.example.larmoby.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ClienteService {
    private static final Logger logger = LoggerFactory.getLogger(ClienteService.class);
    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> getClientes() {
        return clienteRepository.findAll();
    }

    public void criarCliente(Cliente cliente) {
        Optional<Cliente> clienteOptional = clienteRepository.findClienteByEmail(cliente.getEmail());
        if (clienteOptional.isPresent()) {
            throw new IllegalStateException("email já cadastrado");
        }
        clienteRepository.save(cliente);
    }

    @Transactional
    public void deletarCliente(Integer idCliente) {
        boolean existe = clienteRepository.existsById(idCliente);
        if (!existe) {
            throw new IllegalStateException("cliente com id " + idCliente + " não existe");
        }
        clienteRepository.deleteById(idCliente);
    }

    @Transactional
    public void atualizarCliente(int id, Cliente clienteAtualizado) {
        Cliente cliente = clienteRepository.findClienteById_cliente(id)
                .orElseThrow(() -> new IllegalStateException("cliente com o id " + id + " não existe"));
        
        if (clienteAtualizado.getNome() != null && !clienteAtualizado.getNome().isEmpty() && !Objects.equals(cliente.getNome(), clienteAtualizado.getNome())) {
            cliente.setNome(clienteAtualizado.getNome());
        }
        
        if (clienteAtualizado.getEmail() != null && !clienteAtualizado.getEmail().isEmpty() && !Objects.equals(cliente.getEmail(), clienteAtualizado.getEmail())) {
            Optional<Cliente> clienteOptional = clienteRepository.findClienteByEmail(clienteAtualizado.getEmail());
            if (clienteOptional.isPresent() && clienteOptional.get().getId_cliente() != id) {
                throw new IllegalStateException("email já cadastrado");
            }
            cliente.setEmail(clienteAtualizado.getEmail());
        }
        
        if (clienteAtualizado.getTelefone() != null && !clienteAtualizado.getTelefone().isEmpty()) {
            cliente.setTelefone(clienteAtualizado.getTelefone());
        }
        
        if (clienteAtualizado.getStatus() != null && !clienteAtualizado.getStatus().isEmpty()) {
            cliente.setStatus(clienteAtualizado.getStatus());
        }
        
        if (clienteAtualizado.getSenha() != null && !clienteAtualizado.getSenha().isEmpty()) {
            cliente.setSenha(clienteAtualizado.getSenha());
        }
        
        clienteRepository.save(cliente);
    }

    public Cliente autenticarCliente(String email, String senha) {
        logger.info("Tentando autenticar cliente com email: {}", email);
        try {
            Optional<Cliente> clienteOptional = clienteRepository.findClienteByEmail(email);
            if (clienteOptional.isPresent()) {
                Cliente cliente = clienteOptional.get();
                logger.info("Cliente encontrado: ID {}", cliente.getId_cliente());
                String senhaCliente = cliente.getSenha();
                if (senhaCliente != null && senhaCliente.equals(senha)) {
                    logger.info("Senha correta para email: {}", email);
                    return cliente;
                } else {
                    logger.warn("Senha incorreta ou nula para email: {}", email);
                    return null;
                }
            } else {
                logger.warn("Nenhum cliente encontrado para email: {}", email);
                return null;
            }
        } catch (Exception e) {
            logger.error("Erro ao autenticar cliente com email {}: {}", email, e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    public void toggleAdminStatus(int idCliente) {
        try {
            logger.info("Tentando alterar status de admin para cliente ID: {}", idCliente);
            Cliente cliente = clienteRepository.findClienteById_cliente(idCliente)
                    .orElseThrow(() -> new IllegalStateException("cliente com o id " + idCliente + " não existe"));
            
            logger.info("Cliente encontrado: {}", cliente.getNome());
            cliente.setAdmin(!cliente.isAdmin());
            clienteRepository.save(cliente);
            logger.info("Status de admin alterado com sucesso para: {}", cliente.isAdmin());
        } catch (Exception e) {
            logger.error("Erro ao alterar status de admin: {}", e.getMessage());
            throw e;
        }
    }
}