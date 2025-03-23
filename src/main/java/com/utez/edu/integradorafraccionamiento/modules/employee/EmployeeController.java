package com.utez.edu.integradorafraccionamiento.modules.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/empleados")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        return employeeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable long id) {
        return employeeService.findById(id);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Employee employee) {
        return employeeService.save(employee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable long id, @RequestBody Employee employee) {
        return employeeService.update(employee, id);
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<?> updateStatus(@PathVariable long id, @RequestBody Employee employee) {
        return employeeService.updateStatus(id, employee.getEstado());
    }
}