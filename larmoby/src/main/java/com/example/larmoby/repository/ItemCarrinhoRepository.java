package com.example.larmoby.repository;

import com.example.larmoby.model.Carrinho;
import com.example.larmoby.model.ItemCarrinho;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository

public interface ItemCarrinhoRepository {
    @Query("SELECT c FROM ItemCarrinho c WHERE c.id_carrinho = ?")
    List<ItemCarrinho> findItemCarrinhoById_carrinho(int id_carrinho);
    @Query("SELECT c FROM ItemCarrinho c WHERE c.id_item_carrinho = ?")
    Optional<Carrinho> findItemCarrinhoById_item_carrinho(int id_item_carrinho);

    @Query("DELETE FROM ItemCarrinho c WHERE c.id_carrinho = ?")
    Optional<Carrinho> deleteItemCarrinhoByIdCarrinho(int id_carrinho);
}
