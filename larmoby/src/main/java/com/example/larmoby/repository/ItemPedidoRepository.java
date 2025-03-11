package com.example.larmoby.repository;

import com.example.larmoby.model.ItemPedido;
import org.springframework.stereotype.Repository;

@Repository

public interface ItemPedidoRepository {
    void save(ItemPedido itemPedido);
}
