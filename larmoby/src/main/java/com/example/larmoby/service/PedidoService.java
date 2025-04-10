package com.example.larmoby.service;

import com.example.larmoby.model.*;
import com.example.larmoby.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;
    private final ItemPedidoRepository itemPedidoRepository;
    private final ProdutoRepository produtoRepository;
    private final EnderecoRepository enderecoRepository;

    public PedidoService(ItemPedidoRepository itemPedidoRepository, ProdutoRepository produtoRepository, EnderecoRepository enderecoRepository) {
        this.itemPedidoRepository = itemPedidoRepository;
        this.produtoRepository = produtoRepository;
        this.enderecoRepository = enderecoRepository;
    }

    @Transactional
    public Pedido inserirPedido(Map<String, Object> pedidoData) {
        Pedido pedido = new Pedido();
        pedido.setId_cliente((int) pedidoData.get("id_cliente"));
        pedido.setData_pedido(LocalDate.now());
        pedido.setStatus((String) pedidoData.get("status"));
        pedido.setTotal(((Number) pedidoData.get("total")).floatValue());
        
        // Processar o endereço
        @SuppressWarnings("unchecked")
        Map<String, String> endereco = (Map<String, String>) pedidoData.get("endereco");
        
        // Criar novo endereço
        Endereco novoEndereco = new Endereco();
        novoEndereco.setId_cliente(pedido.getId_cliente());
        novoEndereco.setCep(endereco.get("cep"));
        novoEndereco.setBairro(endereco.get("bairro"));
        novoEndereco.setNumero(endereco.get("numero"));
        novoEndereco.setRua(endereco.get("logradouro"));
        novoEndereco.setEstado(endereco.get("estado"));
        novoEndereco.setCidade(endereco.get("cidade"));
        novoEndereco.setComplemento(endereco.get("complemento"));
        
        novoEndereco = enderecoRepository.save(novoEndereco);
        pedido.setId_endereco(novoEndereco.getId_endereco());
        
        String enderecoCompleto = String.format("%s, %s %s, %s - %s, %s, CEP: %s",
            endereco.get("logradouro"),
            endereco.get("numero"),
            endereco.get("complemento") != null && !endereco.get("complemento").isEmpty() ? 
                ", " + endereco.get("complemento") : "",
            endereco.get("bairro"),
            endereco.get("cidade"),
            endereco.get("estado"),
            endereco.get("cep")
        );
        pedido.setEndereco_entrega(enderecoCompleto);
        
        pedido = pedidoRepository.save(pedido);
        
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> itens = (List<Map<String, Object>>) pedidoData.get("itens");
        
        for (Map<String, Object> item : itens) {
            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setId_pedido(pedido.getId_pedido());
            itemPedido.setId_produto((int) item.get("id_produto"));
            itemPedido.setQuantidade((int) item.get("quantidade"));
            itemPedido.setPreco_unitario(((Number) item.get("preco_unitario")).floatValue());
            itemPedido.setSubtotal(((Number) item.get("subtotal")).floatValue());
            
            itemPedidoRepository.save(itemPedido);
            
            // Atualizar o estoque do produto
            Produto produto = produtoRepository.findProdutoById_produto(itemPedido.getId_produto());
            if (produto != null) {
                if (produto.getQnt_estoque() < itemPedido.getQuantidade()) {
                    throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
                }
                produto.setQnt_estoque(produto.getQnt_estoque() - itemPedido.getQuantidade());
                produtoRepository.save(produto);
            }
        }
        
        return pedido;
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

    public Pedido buscarPedidoPorId(int idPedido) {
        return pedidoRepository.findPedidoById_pedido(idPedido);
    }

    public List<ItemPedido> buscarItensPedido(int idPedido) {
        return itemPedidoRepository.findItemPedidoById_pedido(idPedido);
    }

    public void criarPedido(int id) {
    }

    public Pedido atualizarPedido(int id, Pedido pedido) {
        if (pedidoRepository.existsById(id)) {
            pedido.setId_pedido(id);
            return pedidoRepository.save(pedido);
        }
        return null;
    }

    public void deletarPedido(int id) {
        pedidoRepository.deleteById(id);
    }
}
