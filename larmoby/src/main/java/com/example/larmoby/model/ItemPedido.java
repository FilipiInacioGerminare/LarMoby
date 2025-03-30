package com.example.larmoby.model;

import jakarta.persistence.*;

@Entity
@Table(name = "item_pedido")
public class ItemPedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id_item_pedido;
    private int id_pedido;
    private int id_produto;
    private int quantidade;
    private float preco_unitario;
    private float subtotal;

    // Construtores

    public ItemPedido(){}

    public ItemPedido(int id_pedido, int id_produto, int quantidade, float preco_unitario, float subtotal) {
        this.id_pedido = id_pedido;
        this.id_produto = id_produto;
        this.quantidade = quantidade;
        this.preco_unitario = preco_unitario;
        this.subtotal = subtotal;
    }

    // Getters e Setters


    public int getId_item_pedido() {
        return id_item_pedido;
    }

    public void setId_item_pedido(int id_item_pedido) {
        this.id_item_pedido = id_item_pedido;
    }

    public int getId_pedido() {
        return id_pedido;
    }

    public void setId_pedido(int id_pedido) {
        this.id_pedido = id_pedido;
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

    public float getPreco_unitario() {
        return preco_unitario;
    }

    public void setPreco_unitario(float preco_unitario) {
        this.preco_unitario = preco_unitario;
    }

    public float getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(float subtotal) {
        this.subtotal = subtotal;
    }
}
