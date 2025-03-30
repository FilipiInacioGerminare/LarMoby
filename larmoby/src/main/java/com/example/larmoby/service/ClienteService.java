package com.example.larmoby.service;

import com.example.larmoby.model.Cliente;
import com.example.larmoby.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;
    //@Autowired
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
                .orElseThrow(()-> new IllegalStateException(

                        "cliente com o id " + id + " não existe"
                ));
        if (nome != null && nome.isEmpty() && !Objects.equals(cliente.getNome(),nome)) {
            cliente.setNome(nome);
        }
        if (email != null && email.isEmpty() && !Objects.equals(cliente.getEmail(),email)) {
            Optional<Cliente> clienteOptional = clienteRepository.findClienteByEmail(email);
            if (clienteOptional.isPresent()) {
                throw new IllegalStateException("email já cadastrado");
            }
            cliente.setEmail(email);
        }
    }
}
