package com.example.larmoby.service;

import com.example.larmoby.model.Categoria;
import com.example.larmoby.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria inserirCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }

    public Categoria buscarCategoria(Long id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    public Categoria atualizarCategoria(Long id, Categoria categoria) {
        if (categoriaRepository.existsById(id)) {
            categoria.setId_categoria(id);
            return categoriaRepository.save(categoria);
        }
        return null;
    }

    public void deletarCategoria(Long id) {
        categoriaRepository.deleteById(id);
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
