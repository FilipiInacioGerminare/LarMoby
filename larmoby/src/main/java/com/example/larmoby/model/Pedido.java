package com.example.larmoby.model;

import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_pedido;
    
    @Column(name = "id_cliente")
    private int id_cliente;
    
    @Column(name = "id_endereco")
    private int id_endereco;
    
    private LocalDate data_pedido;
    private String status;
    private float total;
    
    @Column(length = 500)
    private String endereco_entrega;

    // Construtores

    public Pedido(){}

    public Pedido(int id_cliente, LocalDate data_pedido, String status, float total, String endereco_entrega){        this.id_cliente = id_cliente;
        this.data_pedido = data_pedido;
        this.status = status;
        this.total = total;
        this.endereco_entrega = endereco_entrega;
    }

    // Getters e Setters

    public int getId_pedido() {
        return id_pedido;
    }

    public void setId_pedido(int id_pedido) {
        this.id_pedido = id_pedido;
    }

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

    public LocalDate getData_pedido() {
        return data_pedido;
    }

    public void setData_pedido(LocalDate data_pedido) {
        this.data_pedido = data_pedido;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public String getEndereco_entrega() {
        return endereco_entrega;
    }

    public void setEndereco_entrega(String endereco_entrega) {
        this.endereco_entrega = endereco_entrega;
    }
}
