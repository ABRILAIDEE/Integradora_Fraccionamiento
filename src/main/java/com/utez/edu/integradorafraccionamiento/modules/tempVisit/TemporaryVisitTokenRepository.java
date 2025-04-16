package com.utez.edu.integradorafraccionamiento.modules.tempVisit;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TemporaryVisitTokenRepository extends JpaRepository<TemporaryVisitToken, String> {
    Optional<TemporaryVisitToken> findByToken(String token);

}
