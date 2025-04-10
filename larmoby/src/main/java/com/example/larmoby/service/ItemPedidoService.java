package com.example.larmoby.service;

import com.example.larmoby.model.ItemPedido;
import com.example.larmoby.repository.ItemPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemPedidoService {

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    public List<ItemPedido> findItensComProdutoByPedidoId(int idPedido) {
        return itemPedidoRepository.findItensComProdutoByPedidoId(idPedido);
    }
} 