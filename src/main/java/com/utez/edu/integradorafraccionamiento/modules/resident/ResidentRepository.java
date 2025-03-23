package com.utez.edu.integradorafraccionamiento.modules.resident;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Long> {
    List<Resident> findAll();
    Resident findById(long id);
    Resident save(Resident resident);
}
