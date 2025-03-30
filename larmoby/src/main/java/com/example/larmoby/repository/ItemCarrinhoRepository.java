package com.example.larmoby.repository;

import com.example.larmoby.model.Carrinho;
import com.example.larmoby.model.ItemCarrinho;
import com.example.larmoby.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Repository

public interface ItemCarrinhoRepository extends JpaRepository<ItemCarrinho, Long> {
    @Query("SELECT c FROM ItemCarrinho c WHERE c.id_carrinho = ?1")
    List<ItemCarrinho> findItemCarrinhoById_carrinho(int id_carrinho);
    @Query("SELECT c FROM ItemCarrinho c WHERE c.id_item_carrinho = ?1")
    Optional<Carrinho> findItemCarrinhoById_item_carrinho(int id_item_carrinho);

    @Transactional
    @Modifying
    @Query("DELETE FROM ItemCarrinho c WHERE c.id_carrinho = ?1")
    void deleteItemCarrinhoByIdCarrinho(int idCarrinho);

    @Query("SELECT c FROM ItemCarrinho c WHERE c.id_carrinho = ?1 AND c.id_produto = ?2")
    ItemCarrinho findItemCarrinhoById_carrinhoAndId_produto(int idCarrinho, int idProduto);
}
