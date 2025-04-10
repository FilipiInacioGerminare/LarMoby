package com.example.larmoby.repository;

import com.example.larmoby.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    Optional<Cliente> findClienteByNome(String nome);
    Optional<Cliente> findClienteByEmail(String email);
    @Query("SELECT c FROM Cliente c WHERE c.id_cliente = ?1")
    Optional<Cliente> findClienteById_cliente(int id);
}
