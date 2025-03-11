package com.example.larmoby.model;

import jakarta.persistence.*;

@Entity
@Table(name = "item_carrinho")
public class ItemCarrinho {
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
    private int id_item_carrinho;
    private int id_produto;
    private int quantidade;
    private float subtotal;
    private int id_carrinho;
    // Construtores

    public ItemCarrinho(){}

    public ItemCarrinho(int id_item_carrinho, int id_produto, int quantidade, float subtotal, int id_carrinho) {
        this.id_item_carrinho = id_item_carrinho;
        this.id_produto = id_produto;
        this.quantidade = quantidade;
        this.subtotal = subtotal;
        this.id_carrinho = id_carrinho;
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
}
