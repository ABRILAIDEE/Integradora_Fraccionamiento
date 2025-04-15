package com.utez.edu.integradorafraccionamiento.modules.house;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    List<House> findAll();
    House findById(long id);
    House save(House house);
    // Este método traerá solo casas cuyo estado sea 'ACTIVA'
    @Query("SELECT h FROM House h WHERE UPPER(h.estado) = UPPER(:estado)")
    List<House> findByEstado(@Param("estado") String estado);
}
