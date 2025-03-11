package com.example.larmoby.repository;

import com.example.larmoby.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findCategoriaByNome(String nome);
    @Query("SELECT c FROM Categoria c WHERE c.id_categoria = ?")
    Optional<Categoria> findCategoriaById_categoria(int id);

}
