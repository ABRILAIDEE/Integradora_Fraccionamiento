package com.utez.edu.integradorafraccionamiento.modules.visits;

import com.utez.edu.integradorafraccionamiento.modules.status.Status;
import com.utez.edu.integradorafraccionamiento.utils.QR.QRCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalTime;
//@CrossOrigin(origins = "{*}")
@RestController
@RequestMapping("/api/visitas")
public class VisitController {

    @Autowired
    private VisitService visitService;

    @Autowired
    private QRCodeService qrCodeService;

    @GetMapping
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo admin y guardias pueden ver todas las visitas
    public ResponseEntity<?> findAll() {
        return visitService.findAll();
    }

    @GetMapping("/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD", "ROLE_RESIDENT"}) // Residentes pueden ver sus visitas, admin y guardias todas
    public ResponseEntity<?> findById(@PathVariable long id) {
        return visitService.findById(id);
    }

    @PostMapping
    @Secured({"ROLE_RESIDENT"}) // Solo los residentes pueden registrar visitas
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
        return visitService.save(fecha, hora, numeroPersonas, descripcion, tipoVisita, placasVehiculo,
                palabraClave, nombreVisitante, residentId, houseId, statusId,
                fotoPlacas, fotoCajuela, fotoIne);
    }

    @PatchMapping("/updateStatus/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo admin y guardias pueden cambiar el estado de visitas
    public ResponseEntity<?> updateStatus(@PathVariable("id") long id,
                                          @RequestBody Status nuevoEstado) {
        return visitService.updateStatus(id, nuevoEstado);
    }

    @GetMapping(value = "/generateQR/{id}", produces = MediaType.IMAGE_PNG_VALUE)
    @Secured({"ROLE_RESIDENT"}) // Solo los residentes pueden generar QR de sus visitas
    public ResponseEntity<byte[]> generateQRCode(@PathVariable Long id) {
        try {
            String qrData = "https://miapp.com/visit/" + id; // URL que se abrirá al escanear el QR
            byte[] qrImage = qrCodeService.generateQRCodeImage(qrData, 300, 300);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(qrImage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/validateQR/{id}")
    @Secured({"ROLE_GUARD"}) // Solo guardias pueden validar QR
    public ResponseEntity<String> validateQR(@PathVariable Long id) {
        return visitService.validateVisit(id);
    }

    @GetMapping("/{id}/verificar")
    @Secured({"ROLE_GUARD"}) // Solo los guardias pueden verificar QR
    public ResponseEntity<?> verificarQR(@PathVariable long id) {
        return visitService.verificarQR(id);
    }

    @PatchMapping("/{id}/cambiarEstado")
    @Secured({"ROLE_GUARD"}) // Solo guardias pueden cambiar el estado
    public ResponseEntity<?> cambiarEstado(@PathVariable long id) {
        return visitService.cambiarEstado(id);
    }




}
