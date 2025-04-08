package com.example.larmoby.model;

import jakarta.persistence.*;

@Entity
@Table
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_endereco;

    @Column(name = "id_cliente")
    private int id_cliente;

    private String cep;
    private String bairro;
    private String numero;
    private String rua;
    private String estado;
    private String cidade;
    private String complemento;

    // Construtores
    public Endereco(){}

    public Endereco(int id_cliente, String cep, String bairro, String numero, String rua, String estado, String cidade, String complemento) {
        this.id_cliente = id_cliente;
        this.cep = cep;
        this.bairro = bairro;
        this.numero = numero;
        this.rua = rua;
        this.estado = estado;
        this.cidade = cidade;
        this.complemento = complemento;
    }

    public int getId_endereco() {
        return id_endereco;
    }

    public void setId_endereco(int id_endereco) {
        this.id_endereco = id_endereco;
    }

    public int getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(int id_cliente) {
        this.id_cliente = id_cliente;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }
}
