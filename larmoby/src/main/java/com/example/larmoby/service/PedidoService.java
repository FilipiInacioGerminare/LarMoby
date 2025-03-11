package com.example.larmoby.service;

import com.example.larmoby.model.*;
import com.example.larmoby.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private ItemCarrinhoRepository itemCarrinhoRepository;

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Transactional
    public Pedido criarPedido(int idCliente) {
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

        return pedido;
    }
}
