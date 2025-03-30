package com.utez.edu.integradorafraccionamiento.modules.resident;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Long> {
    List<Resident> findAll();
    Resident findById(long id);
    Resident save(Resident resident);
    Optional<Resident> findByTelefono(String telefono);
}
