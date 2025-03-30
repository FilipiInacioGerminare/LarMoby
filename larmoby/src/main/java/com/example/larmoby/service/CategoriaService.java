package com.example.larmoby.service;

import com.example.larmoby.model.Categoria;
import com.example.larmoby.repository.CategoriaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> getCategorias() {
        return categoriaRepository.findAll();
    }

    @Transactional
    public void inserir(Categoria categoria) {
        Categoria cat = categoriaRepository.findCategoriaById_categoria(categoria.getId_categoria());
        if (cat != null) {
            throw new IllegalStateException("Essa categoria já existe");
        } else {
            categoriaRepository.save(categoria);
        }
    }

    @Transactional
    public void atualizar(Categoria categoria) {
        Categoria cat = categoriaRepository.findCategoriaById_categoria(categoria.getId_categoria());
        if (cat == null) {
            throw new IllegalStateException("Essa categoria não existe.");
        } else {
            cat.setNome(categoria.getNome());
        }
    }

    @Transactional
    public void deletar(Long id) {
        boolean existe = categoriaRepository.existsById(id);
        if (!existe) {
            throw new IllegalStateException("Essa categoria não foi encontrada.");
        } else {
            categoriaRepository.deleteById(id);
        }

    }

}
