package com.utez.edu.integradorafraccionamiento.modules.tempVisit;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class TemporaryVisitToken {

    @Id
    private String token; // UUID como string

    private Long residentId;
    private Long houseId;

    private boolean used = false;

    private LocalDateTime createdAt;

    private long expirationMinutes; // Por ejemplo: 10

    public boolean isExpired() {
        return createdAt.plusMinutes(expirationMinutes).isBefore(LocalDateTime.now());
    }

    // Getters, setters, constructor vacío, etc.


    public TemporaryVisitToken() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getResidentId() {
        return residentId;
    }

    public void setResidentId(Long residentId) {
        this.residentId = residentId;
    }

    public Long getHouseId() {
        return houseId;
    }

    public void setHouseId(Long houseId) {
        this.houseId = houseId;
    }

    public boolean isUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public long getExpirationMinutes() {
        return expirationMinutes;
    }

    public void setExpirationMinutes(long expirationMinutes) {
        this.expirationMinutes = expirationMinutes;
    }
}

