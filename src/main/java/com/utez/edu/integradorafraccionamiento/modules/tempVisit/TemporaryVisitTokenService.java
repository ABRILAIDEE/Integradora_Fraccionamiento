package com.utez.edu.integradorafraccionamiento.modules.tempVisit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class TemporaryVisitTokenService {

    @Autowired
    private TemporaryVisitTokenRepository tokenRepository;

    public String generateToken(Long residentId, Long houseId, long expirationMinutes) {
        String token = UUID.randomUUID().toString();

        TemporaryVisitToken tempToken = new TemporaryVisitToken();
        tempToken.setToken(token);
        tempToken.setResidentId(residentId);
        tempToken.setHouseId(houseId);
        tempToken.setCreatedAt(LocalDateTime.now());
        tempToken.setExpirationMinutes(expirationMinutes);
        tempToken.setUsed(false);

        tokenRepository.save(tempToken);
        return token;
    }

    public TemporaryVisitToken validateToken(String token) {
        TemporaryVisitToken tempToken = tokenRepository.findById(token)
                .orElseThrow(() -> new RuntimeException("Token no encontrado"));

        if (tempToken.isUsed() || tempToken.isExpired()) {
            throw new RuntimeException("Token expirado o ya usado");
        }

        return tempToken;
    }

    public void markAsUsed(String token) {
        TemporaryVisitToken tempToken = tokenRepository.findById(token)
                .orElseThrow(() -> new RuntimeException("Token no encontrado"));

        tempToken.setUsed(true);
        tokenRepository.save(tempToken);
    }

    public Optional<TemporaryVisitToken> validateAndConsumeToken(String token) {
        Optional<TemporaryVisitToken> optional = tokenRepository.findByToken(token);

        if (optional.isEmpty()) return Optional.empty();

        TemporaryVisitToken tokenEntity = optional.get();

        if (tokenEntity.isUsed()) return Optional.empty();

        LocalDateTime now = LocalDateTime.now();
        if (tokenEntity.getCreatedAt().plusMinutes(tokenEntity.getExpirationMinutes()).isBefore(now)) {
            return Optional.empty();
        }

        return Optional.of(tokenEntity);
    }

    public boolean isTokenValid(String token) {
        Optional<TemporaryVisitToken> optional = tokenRepository.findByToken(token);

        if (optional.isEmpty()) return false;

        TemporaryVisitToken tokenEntity = optional.get();

        if (tokenEntity.isUsed()) return false;

        LocalDateTime now = LocalDateTime.now();
        return !tokenEntity.getCreatedAt()
                .plusMinutes(tokenEntity.getExpirationMinutes())
                .isBefore(now);
    }


}
