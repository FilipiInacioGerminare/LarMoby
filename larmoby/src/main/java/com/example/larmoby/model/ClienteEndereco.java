package com.example.larmoby.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente_endereco")
public class ClienteEndereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id_cliente;
    private int id_endereco;

    // Construtores

    public ClienteEndereco(){}

    public ClienteEndereco(int id_endereco) {
        this.id_endereco = id_endereco;
    }

    // Getters e Setters


    public int getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(int id_cliente) {
        this.id_cliente = id_cliente;
    }

    public int getId_endereco() {
        return id_endereco;
    }

    public void setId_endereco(int id_endereco) {
        this.id_endereco = id_endereco;
    }
}
