package com.example.larmoby.model;

import jakarta.persistence.*;

@Entity
@Table(name = "item_carrinho")
public class ItemCarrinho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_item_carrinho;
    private int id_produto;
    private int quantidade;
    private float subtotal;
    private int id_carrinho;
    
    // Campos adicionais para detalhes do produto
    @Transient
    private String nome_produto;
    @Transient
    private String descricao_produto;
    @Transient
    private float preco_produto;

    // Construtores
    public ItemCarrinho(){}

    public ItemCarrinho(int id_item_carrinho, int id_produto, int quantidade, float subtotal, int id_carrinho) {
        this.id_item_carrinho = id_item_carrinho;
        this.id_produto = id_produto;
        this.quantidade = quantidade;
        this.subtotal = subtotal;
        this.id_carrinho = id_carrinho;
    }

    public ItemCarrinho(int id_item_carrinho, int id_produto, int quantidade, float subtotal, int id_carrinho, 
                       String nome_produto, String descricao_produto, float preco_produto) {
        this.id_item_carrinho = id_item_carrinho;
        this.id_produto = id_produto;
        this.quantidade = quantidade;
        this.subtotal = subtotal;
        this.id_carrinho = id_carrinho;
        this.nome_produto = nome_produto;
        this.descricao_produto = descricao_produto;
        this.preco_produto = preco_produto;
    }

    // Getters e Setters

    public int getId_carrinho() {
        return id_carrinho;
    }

    public void setId_carrinho(int id_carrinho) {
        this.id_carrinho = id_carrinho;
    }

    public int getId_item_carrinho() {
        return id_item_carrinho;
    }

    public void setId_item_carrinho(int id_item_carrinho) {
        this.id_item_carrinho = id_item_carrinho;
    }

    public int getId_produto() {
        return id_produto;
    }

    public void setId_produto(int id_produto) {
        this.id_produto = id_produto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public float getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(float subtotal) {
        this.subtotal = subtotal;
    }

    // Novos getters e setters
    public String getNome_produto() {
        return nome_produto;
    }

    public void setNome_produto(String nome_produto) {
        this.nome_produto = nome_produto;
    }

    public String getDescricao_produto() {
        return descricao_produto;
    }

    public void setDescricao_produto(String descricao_produto) {
        this.descricao_produto = descricao_produto;
    }

    public float getPreco_produto() {
        return preco_produto;
    }

    public void setPreco_produto(float preco_produto) {
        this.preco_produto = preco_produto;
    }
}
