package com.utez.edu.integradorafraccionamiento.modules.house;

import com.utez.edu.integradorafraccionamiento.modules.house.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/casas")
public class HouseController {

    @Autowired
    private HouseService houseService;

    @GetMapping // Obtener todas las casas
    public ResponseEntity<?> findAll() {
        return houseService.findAll();
    }

    @GetMapping("/{id}") // Obtener casa por ID
    public ResponseEntity<?> findById(@PathVariable long id) {
        return houseService.findById(id);
    }

    @PostMapping // Agregar casa al sistema
    public ResponseEntity<?> save(@RequestParam("direccion") String direccion,
                                  @RequestParam("calle") String calle,
                                  @RequestParam("numeroCasa") String numeroCasa,
                                  @RequestParam("descripcion") String descripcion,
                                  @RequestParam("foto") MultipartFile foto) {
        return houseService.save(direccion, calle, numeroCasa, descripcion, foto);
    }

    @PutMapping("/{id}") // Actualizar casa
    public ResponseEntity<?> update(@PathVariable long id, @RequestParam("direccion") String direccion,
                                    @RequestParam("calle") String calle,
                                    @RequestParam("numeroCasa") String numeroCasa,
                                    @RequestParam("descripcion") String descripcion,
                                    @RequestParam("foto") MultipartFile foto) {
        return houseService.update(id, direccion, calle, numeroCasa, descripcion, foto);
    }
}
