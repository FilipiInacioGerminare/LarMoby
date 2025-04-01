package com.example.larmoby.service;

import com.example.larmoby.model.Carrinho;
import com.example.larmoby.model.Cliente;
import com.example.larmoby.model.ItemCarrinho;
import com.example.larmoby.model.Produto;
import com.example.larmoby.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CarrinhoService {
    private final CarrinhoRepository carrinhoRepository;

    private final ItemCarrinhoRepository itemCarrinhoRepository;

    private final ProdutoRepository produtoRepository;

    public CarrinhoService(CarrinhoRepository carrinhoRepository, ItemCarrinhoRepository itemCarrinhoRepository, ProdutoRepository produtoRepository) {
        this.carrinhoRepository = carrinhoRepository;
        this.itemCarrinhoRepository = itemCarrinhoRepository;
        this.produtoRepository = produtoRepository;
    }

    public List<ItemCarrinho> getCarrinho() {
        return itemCarrinhoRepository.findAll();
    }

    @Transactional
    public Carrinho criarCarrinho(int idCliente) {
        carrinhoRepository.findCarrinhoById_cliente(idCliente)
                .ifPresent(c -> { throw new IllegalStateException("Carrinho já existe"); });
        Carrinho novoCarrinho = new Carrinho(idCliente);
        return carrinhoRepository.save(novoCarrinho);
    }


    @Transactional
    public boolean adicionarProduto(int idCarrinho, int idProduto) {
        Carrinho carrinho = carrinhoRepository.findCarrinhoById_carrinho(idCarrinho);
        Produto produto = produtoRepository.findProdutoById_produto(idProduto);

        if (produto == null || carrinho == null) {
            throw new RuntimeException("Carrinho ou produto não encontrado.");
        }

        ItemCarrinho itemCarrinho = itemCarrinhoRepository.findItemCarrinhoById_carrinhoAndId_produto(idCarrinho, idProduto);

        if (itemCarrinho != null) {
            itemCarrinho.setQuantidade(itemCarrinho.getQuantidade() + 1);
            itemCarrinho.setSubtotal(itemCarrinho.getQuantidade() * produto.getPreco());
        } else {
            itemCarrinho = new ItemCarrinho();
            itemCarrinho.setId_carrinho(idCarrinho);
            itemCarrinho.setId_produto(idProduto);
            itemCarrinho.setQuantidade(1);
            itemCarrinho.setSubtotal(produto.getPreco());
        }

        itemCarrinhoRepository.save(itemCarrinho);
        return true;
    }


    @Transactional
    public boolean removerProduto(int idCarrinho, int idProduto) {
        ItemCarrinho item = itemCarrinhoRepository.findItemCarrinhoById_carrinhoAndId_produto(idCarrinho, idProduto);
        Produto produto = produtoRepository.findProdutoById_produto(idProduto);
        if (item != null) {
            item.setSubtotal(item.getSubtotal() - produto.getPreco());
            itemCarrinhoRepository.delete(item);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean atualizarQuantidade(int idCarrinho, int idProduto, int novaQuantidade) {
        if (novaQuantidade <= 0) {
            return removerProduto(idCarrinho, idProduto);
        }

        ItemCarrinho itemCarrinho = itemCarrinhoRepository.findItemCarrinhoById_carrinhoAndId_produto(idCarrinho, idProduto);
        Produto produto = produtoRepository.findProdutoById_produto(idProduto);

        if (itemCarrinho == null || produto == null) {
            throw new RuntimeException("Produto não encontrado no carrinho.");
        }

        itemCarrinho.setQuantidade(novaQuantidade);
        itemCarrinho.setSubtotal(novaQuantidade * produto.getPreco());
        itemCarrinhoRepository.save(itemCarrinho);
        return true;
    }

    @Transactional
    public void limparCarrinho(int idCarrinho) {
        itemCarrinhoRepository.deleteItemCarrinhoByIdCarrinho(idCarrinho);
    }
}
