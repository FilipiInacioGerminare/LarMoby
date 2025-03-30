package com.example.larmoby.repository;

import com.example.larmoby.model.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    @Query("SELECT c FROM Carrinho c WHERE c.id_cliente = ?1")
    Optional<Carrinho> findCarrinhoById_cliente(int id_cliente);
    @Query("SELECT c FROM Carrinho c WHERE c.id_carrinho = ?1")
    Carrinho findCarrinhoById_carrinho(int id_carrinho);
}
