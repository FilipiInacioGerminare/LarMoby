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
    public void deletarCliente(Long idCliente) {
        boolean existe = clienteRepository.existsById(idCliente);
        if (!existe) {
            throw new IllegalStateException("cliente com id " + idCliente + " não existe");
        }
        clienteRepository.deleteById(idCliente);
    }

    @Transactional
    public void atualizarCliente(int id, String nome, String email) {
        Cliente cliente = clienteRepository.findClienteById_cliente(id)
                .orElseThrow(() -> new IllegalStateException("cliente com o id " + id + " não existe"));
        if (nome != null && !nome.isEmpty() && !Objects.equals(cliente.getNome(), nome)) {
            cliente.setNome(nome);
        }
        if (email != null && !email.isEmpty() && !Objects.equals(cliente.getEmail(), email)) {
            Optional<Cliente> clienteOptional = clienteRepository.findClienteByEmail(email);
            if (clienteOptional.isPresent()) {
                throw new IllegalStateException("email já cadastrado");
            }
            cliente.setEmail(email);
        }
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
}