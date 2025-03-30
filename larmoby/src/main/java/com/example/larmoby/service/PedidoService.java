package com.example.larmoby.service;

import com.example.larmoby.model.*;
import com.example.larmoby.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    private final CarrinhoRepository carrinhoRepository;

    private final ItemCarrinhoRepository itemCarrinhoRepository;

    private final ItemPedidoRepository itemPedidoRepository;

    private final ProdutoRepository produtoRepository;

    public PedidoService(PedidoRepository pedidoRepository, CarrinhoRepository carrinhoRepository, ItemCarrinhoRepository itemCarrinhoRepository, ItemPedidoRepository itemPedidoRepository, ProdutoRepository produtoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.carrinhoRepository = carrinhoRepository;
        this.itemCarrinhoRepository = itemCarrinhoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
        this.produtoRepository = produtoRepository;
    }

    @Transactional
    public void criarPedido(int idCliente) {
        Optional<Carrinho> carrinhoOptional = carrinhoRepository.findCarrinhoById_cliente(idCliente);
        if (carrinhoOptional.isEmpty()) {
            throw new RuntimeException("Carrinho não encontrado para o cliente.");
        }

        Carrinho carrinho = carrinhoOptional.get();
        List<ItemCarrinho> itensCarrinho = itemCarrinhoRepository.findItemCarrinhoById_carrinho(carrinho.getId_carrinho());
        if (itensCarrinho.isEmpty()) {
            throw new RuntimeException("Carrinho está vazio.");
        }

        Pedido pedido = new Pedido();
        pedido.setId_cliente(idCliente);
        pedido.setData_pedido(LocalDate.now());
        pedido.setStatus("pendente");

        float total = 0;
        pedido = pedidoRepository.save(pedido);

        for (ItemCarrinho item : itensCarrinho) {
            Produto produto = produtoRepository.findProdutoById_produto(item.getId_produto());
            if (produto.getQnt_estoque() < item.getQuantidade()) {
                throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
            }

            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setId_pedido(pedido.getId_pedido());
            itemPedido.setId_produto(produto.getId_produto());
            itemPedido.setQuantidade(item.getQuantidade());
            itemPedido.setPreco_unitario(produto.getPreco());
            itemPedido.setSubtotal(produto.getPreco() * item.getQuantidade());

            itemPedidoRepository.save(itemPedido);

            total += itemPedido.getSubtotal();

            produto.setQnt_estoque(produto.getQnt_estoque() - item.getQuantidade());
            produtoRepository.save(produto);
        }

        pedido.setTotal(total);
        pedidoRepository.save(pedido);

        itemCarrinhoRepository.deleteItemCarrinhoByIdCarrinho(carrinho.getId_carrinho());
    }

    @Transactional
    public void cancelarPedido(int idPedido) {
        Pedido pedido = pedidoRepository.findPedidoById_pedido(idPedido);
        List<ItemPedido> itemPedidos = itemPedidoRepository.findItemPedidoById_pedido(idPedido);
        for (ItemPedido item : itemPedidos) {
            Produto produto = produtoRepository.findProdutoById_produto(item.getId_produto());
            produto.setQnt_estoque(produto.getQnt_estoque() + item.getQuantidade());
            produtoRepository.save(produto);
        }
        itemPedidoRepository.deleteItemPedidoById_pedido(idPedido);
        pedidoRepository.delete(pedido);
    }

    public List<Pedido> buscarPedidoPorCliente(int idCliente) {
        return pedidoRepository.findPedidoById_cliente(idCliente);
    }

    public List<Pedido> getPedidos() {
        return pedidoRepository.findAll();
    }
}
