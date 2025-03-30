package com.example.larmoby.repository;

import com.example.larmoby.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    @Query("SELECT p FROM Produto p JOIN Categoria c ON c.id_categoria = p.id_categoria WHERE c.nome = 'Eletrônicos'")
    List<Produto> findProdutoById_categoria(String categoria);
    Optional<Produto> findProdutoByNome(String nome);
    @Query("SELECT p FROM Produto p WHERE p.id_produto = ?1")
    Produto findProdutoById_produto(int id);
}
