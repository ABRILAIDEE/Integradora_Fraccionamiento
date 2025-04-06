package com.utez.edu.integradorafraccionamiento.modules.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/empleados")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo administradores y guardias pueden ver la lista de empleados
    public ResponseEntity<?> findAll() {
        return employeeService.findAll();
    }

    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo administradores y guardias pueden ver detalles de un empleado
    public ResponseEntity<?> findById(@PathVariable long id) {
        return employeeService.findById(id);
    }

    @PostMapping
    @Secured("ROLE_ADMIN") // Solo los administradores pueden registrar empleados
    public ResponseEntity<?> save(@RequestBody Employee employee) {
        return employeeService.save(employee);
    }

    @PutMapping("/{id}")
    @Secured("ROLE_ADMIN") // Solo los administradores pueden actualizar empleados
    public ResponseEntity<?> update(@PathVariable long id, @RequestBody Employee employee) {
        return employeeService.update(employee, id);
    }

    @PatchMapping("/{id}/estado")
    @Secured("ROLE_ADMIN") // Solo los administradores pueden cambiar el estado de un empleado
    public ResponseEntity<?> updateStatus(@PathVariable long id, @RequestBody Employee employee) {
        return employeeService.updateStatus(id, employee.getEstado());
    }
}
