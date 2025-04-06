package com.example.larmoby.service;

import com.example.larmoby.model.Cliente;
import com.example.larmoby.model.Produto;
import com.example.larmoby.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> getProdutos() {
        return produtoRepository.findAll();
    }

    @Transactional
    public void inserirProduto(Produto produto) {
        Produto prodt = produtoRepository.findProdutoById_produto(produto.getId_produto());
        if (prodt != null) {
            throw new IllegalStateException("produto já cadastrado");
        }
        produtoRepository.save(produto);
    }

    @Transactional
    public void deletarProduto(int idProduto) {
        boolean existe = produtoRepository.existsById(idProduto);
        if (!existe) {
            throw new IllegalStateException("Produto com id " + idProduto + " não existe");
        }
        produtoRepository.deleteById(idProduto);
    }

    @Transactional
    public void atualizarProduto(Produto produto) {
        Produto prdt = produtoRepository.findProdutoById_produto(produto.getId_produto());
        if (prdt == null) {
            throw new IllegalStateException("Produto com id " + produto.getId_produto() + " não encontrado");
        }
        prdt.setImagem_url(produto.getImagem_url());
        prdt.setPreco(produto.getPreco());
        prdt.setNome(produto.getNome());
        prdt.setDestaque(produto.isDestaque());
        prdt.setDescricao(produto.getDescricao());
        prdt.setQnt_estoque(produto.getQnt_estoque());

        produtoRepository.save(prdt);
    }

}
