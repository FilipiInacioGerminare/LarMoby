package com.example.larmoby.model;

import jakarta.persistence.*;

@Entity
@Table
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id_categoria;
    private String nome;

    // Construtores

    public Categoria() {}
    public Categoria(String nome) {
        this.nome = nome;
    }

    // Getters e Setters

    public int getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(int id_categoria) {
        this.id_categoria = id_categoria;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
