package com.utez.edu.integradorafraccionamiento.modules.visits;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {
    List<Visit> findAll();
    //Visit findById(long id);
    Visit save(Visit visit);
    Optional<Visit> findById(Long id);

    // Método para filtrar visitas por estado
    List<Visit> findByStatusId(Long statusId);

}
