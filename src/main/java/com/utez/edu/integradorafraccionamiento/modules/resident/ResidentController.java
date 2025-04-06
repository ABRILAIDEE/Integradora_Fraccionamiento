package com.utez.edu.integradorafraccionamiento.modules.resident;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/residente")
public class ResidentController {

    @Autowired
    private ResidentService residentService;

    @GetMapping // Obtener todos los Residentes
    @Secured({"ROLE_ADMIN"}) // Solo los administradores pueden ver todos los residentes
    public ResponseEntity<?> findAll() {
        return residentService.findAll();
    }

    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_RESIDENT"}) // Un residente puede ver su propio perfil
    public ResponseEntity<?> findById(@PathVariable long id) {
        return residentService.findById(id);
    }

    @PostMapping
    @Secured({"ROLE_ADMIN"}) // Solo el administrador puede registrar nuevos residentes
    public ResponseEntity<?> save(@RequestBody Resident resident) {
        return residentService.save(resident);
    }

    @PutMapping("/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_RESIDENT"}) // Un residente puede actualizar su perfil, pero el admin puede actualizar cualquier residente
    public ResponseEntity<?> update(@PathVariable long id, @RequestBody Resident resident) {
        return residentService.update(resident, id);
    }

    @PatchMapping("/{id}/estado")
    @Secured({"ROLE_ADMIN"}) // Solo el administrador puede cambiar el estado de un residente (bloquear/desbloquear)
    public ResponseEntity<?> updateStatus(@PathVariable long id, @RequestBody Resident resident) {
        return residentService.updateStatus(id, resident.getEstado());
    }
}
