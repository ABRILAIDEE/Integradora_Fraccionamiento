package com.utez.edu.integradorafraccionamiento.modules.employee;

import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findAll();
    Employee findById(long id);
    Employee save(Employee employee);
}
