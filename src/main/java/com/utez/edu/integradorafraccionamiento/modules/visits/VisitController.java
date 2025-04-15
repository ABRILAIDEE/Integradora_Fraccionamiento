package com.utez.edu.integradorafraccionamiento.modules.visits;

import com.utez.edu.integradorafraccionamiento.modules.status.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/visitas")
public class VisitController {

    @Autowired
    private VisitService visitService;

    @GetMapping("")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo admin y guardias pueden ver todas las visitas
    public ResponseEntity<?> findAll() {
        return visitService.findAll();
    }
    @GetMapping("/me")
    @Secured("ROLE_RESIDENT")
    public ResponseEntity<?> findMyVisits(Authentication authentication) {
        return visitService.findMyVisits(authentication);
    }

    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD", "ROLE_RESIDENT"}) // Residentes pueden ver sus visitas, admin y guardias todas
    public ResponseEntity<?> findById(@PathVariable long id) {
        return visitService.findById(id);
    }

    // CONTROLADOR ACTUALIZADO
    @PostMapping("")
    @Secured({"ROLE_RESIDENT", "ROLE_ADMIN"})
    public ResponseEntity<?> save(@RequestParam("fecha") LocalDate fecha,
                                  @RequestParam("hora") LocalTime hora,
                                  @RequestParam("numeroPersonas") int numeroPersonas,
                                  @RequestParam("descripcion") String descripcion,
                                  @RequestParam("tipoVisita") String tipoVisita,
                                  @RequestParam("placasVehiculo") String placasVehiculo,
                                  @RequestParam(value = "palabraClave", required = false) String palabraClave,
                                  @RequestParam("nombreVisitante") String nombreVisitante,
                                  @RequestParam("residentId") Long residentId,
                                  @RequestParam("houseId") Long houseId,
                                  @RequestParam("statusId") Long statusId,
                                  @RequestPart(value = "fotoPlacas", required = false) MultipartFile fotoPlacas,
                                  @RequestPart(value = "fotoCajuela", required = false) MultipartFile fotoCajuela,
                                  @RequestPart(value = "fotoIne", required = false) MultipartFile fotoIne) {

        Map<String, Object> response = new HashMap<>();

        try {
            Visit savedVisit = visitService.saveAndReturnVisit(
                    fecha, hora, numeroPersonas, descripcion, tipoVisita, placasVehiculo,
                    palabraClave, nombreVisitante, residentId, houseId, statusId,
                    fotoPlacas, fotoCajuela, fotoIne
            );

            String qrUrl = "http://localhost:8080/api/visitas/" + savedVisit.getId();

            response.put("message", "Visita registrada exitosamente");
            response.put("status", 201);
            response.put("qrUrl", qrUrl);
            response.put("visitId", savedVisit.getId());
            response.put("nombreVisitante", savedVisit.getNombreVisitante());

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (RuntimeException | IOException e) {
            e.printStackTrace();
            response.put("message", "Error: " + e.getMessage());
            response.put("status", 400);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Error inesperado: " + e.getMessage());
            response.put("status", 500);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PatchMapping("/updateStatus/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo admin y guardias pueden cambiar el estado de visitas
    public ResponseEntity<?> updateStatus(@PathVariable("id") long id,
                                          @RequestBody Status nuevoEstado) {
        return visitService.updateStatus(id, nuevoEstado);
    }

    // Mostrar visitas pendientes
    @GetMapping("/pendiente")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo admin y guardias pueden ver las visitas pendientes
    public ResponseEntity<?> findPendingVisits() {
        return visitService.findPendingVisits();
    }

    // Mostrar visitas en progreso
    @GetMapping("/progreso")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo admin y guardias pueden ver las visitas pendientes
    public ResponseEntity<?> findInProgressVisits() {
        return visitService.findInProgressVisits();
    }

    //Patch aumenta el status
    @PatchMapping("/upgradeStatus/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"})
    public ResponseEntity<?> avanzarEstado(@PathVariable("id") long id) {
        return visitService.avanzarEstado(id);
    }

    @GetMapping("/pendiente/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo admin y guardias pueden ver visitas pendientes
    public ResponseEntity<?> findPendingVisitById(@PathVariable Long id) {
        return visitService.findPendingVisitById(id);
    }

    @GetMapping("/progreso/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo admin y guardias pueden ver visitas en progreso
    public ResponseEntity<?> findInProgressVisitById(@PathVariable Long id) {
        return visitService.findInProgressVisitById(id);
    }




}
