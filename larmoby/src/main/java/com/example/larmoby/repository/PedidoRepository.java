package com.example.larmoby.repository;

import com.example.larmoby.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    @Query("SELECT p FROM Pedido p WHERE p.id_cliente = ?1")
    List<Pedido> findPedidoById_cliente(int id_cliente);
    @Query("SELECT p FROM Pedido p WHERE p.id_pedido = ?1")
    Pedido findPedidoById_pedido(int id_pedido);
}
