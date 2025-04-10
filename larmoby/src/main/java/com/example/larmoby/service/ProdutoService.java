package com.example.larmoby.service;

import com.example.larmoby.model.Produto;
import com.example.larmoby.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public Produto inserirProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    public Produto buscarProduto(int id) {
        return produtoRepository.findById(id).orElse(null);
    }

    public Produto atualizarProduto(int id, Produto produto) {
        if (produtoRepository.existsById(id)) {
            produto.setId_produto(id);
            return produtoRepository.save(produto);
        }
        return null;
    }

    public void deletarProduto(int id) {
        produtoRepository.deleteById(id);
    }
}
