//package com.example.larmoby.controller;
//
//import com.example.larmoby.model.ItemCarrinho;
//import com.example.larmoby.model.Pedido;
//import com.example.larmoby.service.CarrinhoService;
//import com.example.larmoby.service.PedidoService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/carrinhos")
//
//public class CarrinhoController {
//    private final CarrinhoService carrinhoService;
//    @Autowired
//    public CarrinhoController(CarrinhoService carrinhoService) {
//        this.carrinhoService = carrinhoService;
//    }
//
//    @GetMapping
//    public List<ItemCarrinho> getItemCarrinho() {
//        return carrinhoService.getCarrinho();
//    }
//
//    @PostMapping("/adicionarproduto")
//    public boolean adicionarProduto(int idCarrinho, int idProduto) {
//        return carrinhoService.adicionarProduto(idCarrinho, idProduto);
//    }
//
//    @DeleteMapping("/removerproduto")
//    public boolean removerProduto(int idCarrinho, int idProduto) {
//        return carrinhoService.removerProduto(idCarrinho, idProduto);
//    }
//
//    @PutMapping("/atualizarquantidade")
//    public boolean atualizarQuantidade(int idCarrinho, int idProduto, int novaQuantidade) {
//        return carrinhoService.atualizarQuantidade(idCarrinho, idProduto, novaQuantidade);
//    }
//
//    @PostMapping("/limparcarrinho")
//    public void limparCarrinho(int idCarrinho) {
//        carrinhoService.limparCarrinho(idCarrinho);
//    }
//
//}
package com.example.larmoby.controller;

import com.example.larmoby.model.ItemCarrinho;
import com.example.larmoby.service.CarrinhoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carrinhos")
public class CarrinhoController {

    private final CarrinhoService carrinhoService;

    public CarrinhoController(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    @GetMapping
    public ResponseEntity<List<ItemCarrinho>> getItemCarrinho() {
        return ResponseEntity.ok(carrinhoService.getCarrinho());
    }

    @PostMapping("/adicionarproduto")
    public ResponseEntity<String> adicionarProduto(@RequestParam int idCarrinho, @RequestParam int idProduto) {
        carrinhoService.adicionarProduto(idCarrinho, idProduto);
        return ResponseEntity.ok("Produto adicionado ao carrinho com sucesso!");
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
