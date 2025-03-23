package com.utez.edu.integradorafraccionamiento.modules.resident;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/residente")
public class ResidentController {

    @Autowired
    private ResidentService residentService;

    @GetMapping //Obtener todos los Residentes
    public ResponseEntity<?> findAll() {
        return residentService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable long id) {
        return residentService.findById(id);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Resident resident) {
        return residentService.save(resident);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable long id, @RequestBody Resident resident) {
        return residentService.update(resident, id);
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<?> updateStatus(@PathVariable long id, @RequestBody Resident resident) {
        return residentService.updateStatus(id, resident.getEstado());
    }
}