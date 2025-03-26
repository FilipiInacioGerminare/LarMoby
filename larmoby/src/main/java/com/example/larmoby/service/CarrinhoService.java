package com.example.larmoby.service;

import com.example.larmoby.model.Carrinho;
import com.example.larmoby.repository.CarrinhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarrinhoService {

    private final CarrinhoRepository carrinhoRepository;

    @Autowired
    public CarrinhoService(CarrinhoRepository carrinhoRepository) {
        this.carrinhoRepository = carrinhoRepository;
    }

    public Optional<Carrinho> getCarrinhoByIdCliente(int idCliente) {
        return carrinhoRepository.findCarrinhoById_cliente(idCliente);
    }

    public Optional<Carrinho> getCarrinhoByIdCarrinho(int idCarrinho) {
        return carrinhoRepository.findCarrinhoById_carrinho(idCarrinho);
    }

    public Carrinho saveCarrinho(Carrinho carrinho) {
        return carrinhoRepository.save(carrinho);
    }

    public void deleteCarrinho(Long idCarrinho) {
        carrinhoRepository.deleteById(idCarrinho);
    }
}
