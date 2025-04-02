package com.utez.edu.integradorafraccionamiento.utils.QR;

import com.utez.edu.integradorafraccionamiento.modules.visits.VisitRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/visit")
public class QRValidationController {

    private final VisitRepository visitRepository;

    public QRValidationController(VisitRepository visitRepository) {
        this.visitRepository = visitRepository;
    }

    @GetMapping("/validate/{visitId}")
    public ResponseEntity<String> validateQR(@PathVariable Long visitId) {
        return visitRepository.findById(visitId)
                .map(visit -> {
                    if (visit.getStatus().getName().equals("Pendiente")) {
                        visit.getStatus().setName("En progreso");
                        visitRepository.save(visit);
                        return ResponseEntity.ok("QR válido, acceso permitido.");
                    }
                    return ResponseEntity.badRequest().body("QR inválido o expirado.");
                })
                .orElse(ResponseEntity.badRequest().body("Visita no encontrada."));
    }
}
