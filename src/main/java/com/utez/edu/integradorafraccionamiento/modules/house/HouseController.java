package com.utez.edu.integradorafraccionamiento.modules.house;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/casas")
public class HouseController {

    @Autowired
    private HouseService houseService;

    @GetMapping // Obtener todas las casas
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo administradores y guardias pueden ver todas las casas
    public ResponseEntity<?> findAll() {
        return houseService.findAll();
    }

    @GetMapping("/activas")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD", "ROLE_RESIDENT"})
    public ResponseEntity<?> findAllActive() {
        return houseService.findAllActive();
    }

    @GetMapping("/{id}") // Obtener casa por ID
    @Secured({"ROLE_ADMIN", "ROLE_GUARD", "ROLE_RESIDENT"}) // Residentes pueden ver su propia casa, guardias y admins pueden ver todas
    public ResponseEntity<?> findById(@PathVariable long id) {
        return houseService.findById(id);
    }

    @PostMapping // Agregar casa al sistema
    @Secured("ROLE_ADMIN") // Solo los administradores pueden agregar casas
    public ResponseEntity<?> save(@RequestParam("direccion") String direccion,
                                  @RequestParam("calle") String calle,
                                  @RequestParam("numeroCasa") String numeroCasa,
                                  @RequestParam("descripcion") String descripcion,
                                  @RequestParam("estado") String estado,
                                  @RequestParam("foto") MultipartFile foto) {
        return houseService.save(direccion, calle, numeroCasa, descripcion, estado, foto);
    }

    @PutMapping("/{id}") // Actualizar casa
    @Secured("ROLE_ADMIN") // Solo los administradores pueden actualizar información de casas
    public ResponseEntity<?> update(@PathVariable long id, @RequestParam("direccion") String direccion,
                                    @RequestParam("calle") String calle,
                                    @RequestParam("numeroCasa") String numeroCasa,
                                    @RequestParam("descripcion") String descripcion,
                                    @RequestParam("estado") String estado,
                                    @RequestParam(value = "foto", required = false) MultipartFile foto) {
        return houseService.update(id, direccion, calle, numeroCasa, descripcion, estado, foto);
    }
}
