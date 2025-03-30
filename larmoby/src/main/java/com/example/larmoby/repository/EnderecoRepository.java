package com.example.larmoby.repository;

import com.example.larmoby.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface EnderecoRepository extends JpaRepository<Endereco, Long>{
    @Query("SELECT e FROM Endereco e WHERE e.id_endereco = ?1")
    Endereco findEnderecoById_endereco(int id_endereco);
}
