package com.example.larmoby.repository;

import com.example.larmoby.model.Carrinho;
import com.example.larmoby.model.ItemPedido;
import com.example.larmoby.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long>  {

    @Query("SELECT i FROM ItemPedido i WHERE i.id_item_pedido = ?1")
    List<ItemPedido> findItemPedidoById_pedido(int id_pedido);
    @Transactional
    @Modifying
    @Query("DELETE FROM ItemPedido i WHERE i.id_pedido = ?1")
    void deleteItemPedidoById_pedido(int idPedido);
}
