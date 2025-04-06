package com.example.larmoby.repository;

import com.example.larmoby.model.ItemCarrinhoView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemCarrinhoViewRepository extends JpaRepository<ItemCarrinhoView, Integer> {
    @Query("SELECT v FROM ItemCarrinhoView v WHERE v.id_carrinho = ?1")
    List<ItemCarrinhoView> findItensCarrinhoByIdCarrinho(int idCarrinho);
} 