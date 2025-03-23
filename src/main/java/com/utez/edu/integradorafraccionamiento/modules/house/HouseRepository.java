package com.utez.edu.integradorafraccionamiento.modules.house;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    List<House> findAll();
    House findById(long id);
    House save(House house);
}
