package com.example.larmoby.controller;

import com.example.larmoby.service.CepService;
import com.example.larmoby.model.CepDTO;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/cep")
public class CepController {

    private final CepService cepService;

    public CepController(CepService cepService) {
        this.cepService = cepService;
    }

    @GetMapping("/{cep}")
    public Mono<CepDTO> consultarCep(@PathVariable String cep) {
        return cepService.buscarCep(cep);
    }
}
