package com.example.larmoby.controller;

import com.example.larmoby.service.CepService;
import com.example.larmoby.model.CepDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/cep")
@CrossOrigin(origins = "http://localhost:3000")
public class CepController {

    private static final Logger logger = LoggerFactory.getLogger(CepController.class);
    private final CepService cepService;

    public CepController(CepService cepService) {
        this.cepService = cepService;
    }

    @GetMapping("/{cep}")
    public Mono<ResponseEntity<CepDTO>> consultarCep(@PathVariable String cep) {
        logger.info("Recebida requisição para consultar CEP: {}", cep);
        
        return cepService.buscarCep(cep)
                .map(result -> {
                    if (result.getErro() != null && result.getErro()) {
                        logger.warn("CEP não encontrado: {}", cep);
                        return ResponseEntity.ok(result);
                    }
                    logger.info("CEP encontrado com sucesso: {}", cep);
                    return ResponseEntity.ok(result);
                })
                .onErrorResume(error -> {
                    logger.error("Erro ao consultar CEP {}: {}", cep, error.getMessage());
                    CepDTO errorResponse = new CepDTO();
                    errorResponse.setErro(true);
                    return Mono.just(ResponseEntity.ok(errorResponse));
                });
    }
}
