package com.example.larmoby.model;

import jakarta.persistence.*;

@Entity
@Table
public class Produto {
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
    private int id_produto;
    private String nome;
    private String descricao;
    private float preco;
    private String imagem_url;
    private boolean destaque;
    private int qnt_estoque;
    private int id_categoria;

    // Construtores

    public Produto(){}

    public Produto(String nome, String descricao, float preco, String imagem_url, boolean destaque, int qnt_estoque, int id_categoria) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.imagem_url = imagem_url;
        this.destaque = destaque;
        this.qnt_estoque = qnt_estoque;
        this.id_categoria = id_categoria;
    }

    // getters e setters


    public int getId_produto() {
        return id_produto;
    }

    public void setId_produto(int id_produto) {
        this.id_produto = id_produto;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public float getPreco() {
        return preco;
    }

    public void setPreco(float preco) {
        this.preco = preco;
    }

    public String getImagem_url() {
        return imagem_url;
    }

    public void setImagem_url(String imagem_url) {
        this.imagem_url = imagem_url;
    }

    public boolean isDestaque() {
        return destaque;
    }

    public void setDestaque(boolean destaque) {
        this.destaque = destaque;
    }

    public int getQnt_estoque() {
        return qnt_estoque;
    }

    public void setQnt_estoque(int qnt_estoque) {
        this.qnt_estoque = qnt_estoque;
    }

    public int getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(int id_categoria) {
        this.id_categoria = id_categoria;
    }
}
