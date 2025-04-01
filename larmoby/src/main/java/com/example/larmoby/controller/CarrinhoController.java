package com.example.larmoby.controller;

import com.example.larmoby.model.ItemCarrinho;
import com.example.larmoby.service.CarrinhoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carrinhos")
@CrossOrigin(origins = "http://localhost:3000")
public class CarrinhoController {

    private final CarrinhoService carrinhoService;

    public CarrinhoController(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    @GetMapping
    public ResponseEntity<List<ItemCarrinho>> getCarrinho() {
        return ResponseEntity.ok(carrinhoService.getCarrinho());
    }

    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<?> getCarrinhoByCliente(@PathVariable int idCliente) {
        try {
            List<ItemCarrinho> itens = carrinhoService.getCarrinhoByCliente(idCliente);
            return ResponseEntity.ok(itens);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao buscar carrinho: " + e.getMessage());
        }
    }

    @PostMapping("/adicionarproduto")
    public ResponseEntity<?> adicionarProduto(
            @RequestParam int idCarrinho,
            @RequestParam int idProduto) {
        try {
            carrinhoService.adicionarProduto(idCarrinho, idProduto);
            return ResponseEntity.ok("Produto adicionado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao adicionar produto: " + e.getMessage());
        }
    }

    @DeleteMapping("/removerproduto")
    public ResponseEntity<String> removerProduto(@RequestParam int idCarrinho, @RequestParam int idProduto) {
        carrinhoService.removerProduto(idCarrinho, idProduto);
        return ResponseEntity.ok("Produto removido do carrinho com sucesso!");
    }

    @PutMapping("/atualizarquantidade")
    public ResponseEntity<String> atualizarQuantidade(@RequestParam int idCarrinho, @RequestParam int idProduto, @RequestParam int novaQuantidade) {
        carrinhoService.atualizarQuantidade(idCarrinho, idProduto, novaQuantidade);
        return ResponseEntity.ok("Quantidade do produto atualizada com sucesso!");
    }

    @PostMapping("/limparcarrinho")
    public ResponseEntity<String> limparCarrinho(@RequestParam int idCarrinho) {
        carrinhoService.limparCarrinho(idCarrinho);
        return ResponseEntity.ok("Carrinho limpo com sucesso!");
    }
}
