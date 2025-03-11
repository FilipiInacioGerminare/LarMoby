package com.example.larmoby.model;

import jakarta.persistence.*;

@Entity
@Table
public class Carrinho {

    @Id
    @SequenceGenerator(
            name = "cliente_sequence",
            sequenceName = "cliente_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cliente_sequence"
    )
    private int id_carrinho;
    private int id_cliente;

    // Construtores

    public Carrinho() {
    }
    public Carrinho(int id_cliente) {
        this.id_cliente = id_cliente;
    }

    // Getters e Setters

    public int getId_carrinho() {
        return id_carrinho;
    }

    public void setId_carrinho(int id_carrinho) {
        this.id_carrinho = id_carrinho;
    }

    public int getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(int id_cliente) {
        this.id_cliente = id_cliente;
    }
}
