package com.example.larmoby.service;

import com.example.larmoby.model.CepDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class CepService {

    private final WebClient webClient;

    public CepService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://viacep.com.br/ws")
                .build();
    }

    public Mono<CepDTO> buscarCep(String cep) {
        return webClient.get()
                .uri("/{cep}/json", cep)
                .retrieve()
                .bodyToMono(CepDTO.class);
    }
}

