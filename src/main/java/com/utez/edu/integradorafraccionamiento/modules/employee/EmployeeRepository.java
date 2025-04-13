package com.utez.edu.integradorafraccionamiento.modules.employee;

import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findAll();
    Employee findById(long id);
    Employee save(Employee employee);

// 1.- Establecer la palabra secreta


    // 2.- Crear los métodos de consulta para UserRepository
    // Buscar empleado por email y contraseña
    @Query(value = "SELECT * FROM employee " +
            "WHERE email = :email " +
            "AND contrasena = :password",
            nativeQuery = true)
    Optional<Employee> findByEmailAndPassword(
            @Param("email") String email,
            @Param("password") String password
    );

    // Buscar empleado solo por email
    Optional<Employee> findByEmail(String email);

    List<Employee> findByRolId(long rolId);



}
