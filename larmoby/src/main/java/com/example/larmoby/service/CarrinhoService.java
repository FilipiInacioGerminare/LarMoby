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

    public Carrinho getCarrinhoPorCliente(int idCliente) {
        Optional<Carrinho> carrinho = carrinhoRepository.findCarrinhoById_cliente(idCliente);
        if (carrinho.isEmpty()) {
            throw new RuntimeException("Carrinho não encontrado para o cliente: " + idCliente);
        }
        return carrinho.get();
    }

    @Transactional
    public Carrinho criarCarrinho(int idCliente) {
        try {
            // Tenta encontrar um carrinho existente
            Optional<Carrinho> carrinhoExistente = carrinhoRepository.findCarrinhoById_cliente(idCliente);
            if (carrinhoExistente.isPresent()) {
                return carrinhoExistente.get();
            }
            
            // Se não existir, cria um novo
            Carrinho novoCarrinho = new Carrinho();
            novoCarrinho.setId_cliente(idCliente);
            return carrinhoRepository.save(novoCarrinho);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao criar/obter carrinho: " + e.getMessage());
        }
    }

    @Transactional
    public boolean adicionarProduto(int idCarrinho, int idProduto) {
        try {
            Carrinho carrinho = carrinhoRepository.findCarrinhoById_carrinho(idCarrinho);
            Produto produto = produtoRepository.findProdutoById_produto(idProduto);

            if (produto == null || carrinho == null) {
                throw new RuntimeException("Carrinho ou produto não encontrado.");
            }

            // Verifica se o produto já está no carrinho
            ItemCarrinho itemExistente = itemCarrinhoRepository.findItemCarrinhoById_carrinhoAndId_produto(idCarrinho, idProduto);

            if (itemExistente != null) {
                // Se já existe, incrementa a quantidade
                itemExistente.setQuantidade(itemExistente.getQuantidade() + 1);
                itemExistente.setSubtotal(itemExistente.getQuantidade() * produto.getPreco());
                itemCarrinhoRepository.save(itemExistente);
            } else {
                // Se não existe, cria um novo item
                ItemCarrinho novoItem = new ItemCarrinho();
                novoItem.setId_carrinho(idCarrinho);
                novoItem.setId_produto(idProduto);
                novoItem.setQuantidade(1);
                novoItem.setSubtotal(produto.getPreco());
                itemCarrinhoRepository.save(novoItem);
            }
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao adicionar produto ao carrinho: " + e.getMessage());
        }
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
