package com.example.larmoby.service;

import com.example.larmoby.model.Endereco;
import com.example.larmoby.repository.EnderecoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EnderecoService {
    private final EnderecoRepository enderecoRepository;

    public EnderecoService(EnderecoRepository enderecoRepository) {
        this.enderecoRepository = enderecoRepository;
    }

    public List<Endereco> getEnderecos() {
        return enderecoRepository.findAll();
    }

    @Transactional
    public void inserir(Endereco endereco) {
        Endereco end = enderecoRepository.findEnderecoById_endereco(endereco.getId_endereco());
        if (end != null) {
            throw new IllegalStateException("Endereço já cadastrado");
        }
        enderecoRepository.save(endereco);
    }

    @Transactional
    public void atualizar(Endereco endereco) {
        Endereco end = enderecoRepository.findEnderecoById_endereco(endereco.getId_endereco());
        if (end == null) {
            throw new IllegalStateException("Não foi possível encontrar esse endereço.");
        } else {
            end.setCep(endereco.getCep());
            end.setCidade(endereco.getCidade());
            end.setComplemento(endereco.getComplemento());
            end.setEstado(endereco.getEstado());
            end.setNumero(endereco.getNumero());
            end.setRua(endereco.getRua());
        }

    }

    @Transactional
    public void deletar(Long id) {
        Boolean existe = enderecoRepository.existsById(id);
        if (!existe) {
            throw new IllegalStateException("Não foi possível encontrar esse endereço.");
        } else {
            enderecoRepository.deleteById(id);
        }
    }
}
