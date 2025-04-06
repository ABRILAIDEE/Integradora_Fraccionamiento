package com.utez.edu.integradorafraccionamiento.modules.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/informes")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo administradores y guardias pueden ver todos los informes
    public ResponseEntity<?> findAll() {
        return reportService.findAll();
    }

    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD", "ROLE_RESIDENT"}) // Los residentes pueden ver informes relacionados con sus visitas
    public ResponseEntity<?> findById(@PathVariable long id) {
        return reportService.findById(id);
    }

    @PostMapping
    @Secured({"ROLE_GUARD"}) // Solo los guardias pueden generar informes
    public ResponseEntity<?> save(@RequestParam("visitId") Long visitId,
                                  @RequestParam(value = "palabraClave", required = false) String palabraClave,
                                  @RequestPart(value = "fotoPlacas", required = false) MultipartFile fotoPlacas,
                                  @RequestPart(value = "fotoCajuela", required = false) MultipartFile fotoCajuela,
                                  @RequestParam("nombreVisitante") boolean nombreVisitante,
                                  @RequestParam("tipoVisita") String tipoVisita,
                                  @RequestParam("numeroCasa") boolean numeroCasa,
                                  @RequestPart(value = "fotoIne", required = false) MultipartFile fotoIne,
                                  @RequestParam("numeroPersonas") boolean numeroPersonas,
                                  @RequestParam(value = "observaciones", required = false) String observaciones) {
        return reportService.save(visitId, palabraClave, fotoPlacas, fotoCajuela, nombreVisitante,
                tipoVisita, numeroCasa, fotoIne, numeroPersonas, observaciones);
    }
}
