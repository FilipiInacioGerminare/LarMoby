package com.example.larmoby.service;

import com.example.larmoby.model.CepDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class CepService {

    private static final Logger logger = LoggerFactory.getLogger(CepService.class);
    private final WebClient webClient;

    public CepService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://viacep.com.br/ws")
                .build();
    }

    public Mono<CepDTO> buscarCep(String cep) {
        logger.info("Consultando CEP: {}", cep);
        
        // Formatar o CEP para garantir que tenha 8 dígitos
        String cepFormatado = cep.replaceAll("\\D", "");
        if (cepFormatado.length() != 8) {
            logger.warn("CEP inválido: {}", cep);
            CepDTO cepDTO = new CepDTO();
            cepDTO.setErro(true);
            return Mono.just(cepDTO);
        }
        
        return webClient.get()
                .uri("/{cep}/json", cepFormatado)
                .retrieve()
                .bodyToMono(CepDTO.class)
                .doOnSuccess(result -> {
                    if (result.getErro() != null && result.getErro()) {
                        logger.warn("CEP não encontrado: {}", cep);
                    } else {
                        logger.info("CEP encontrado: {} - {}", cep, result.getLogradouro());
                    }
                })
                .doOnError(error -> logger.error("Erro ao consultar CEP {}: {}", cep, error.getMessage()));
    }
}

