package com.utez.edu.integradorafraccionamiento.modules.report;

import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import com.utez.edu.integradorafraccionamiento.modules.visits.Visit;
import com.utez.edu.integradorafraccionamiento.modules.visits.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private VisitRepository visitRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll() {
        List<Report> list = reportRepository.findAll();
        Map<String, Object> body = new HashMap<>();

        body.put("message", list.isEmpty() ? "Aun no hay registros" : "Operacion realizada exitosamente");
        body.put("status", 200);
        body.put("data", list);

        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(long id) {
        Report found = reportRepository.findById(id);
        Map<String, Object> body = new HashMap<>();

        body.put("message", found == null ? "Recurso no encontrado" : "Operacion realizada exitosamente");
        body.put("status", found == null ? 404 : 200);
        body.put("data", found);

        return new ResponseEntity<>(body, found == null ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @Transactional(rollbackFor = {IOException.class, SQLException.class, Exception.class})
    public ResponseEntity<?> save(Long visitId, String palabraClave, MultipartFile fotoPlacas,
                                  MultipartFile fotoCajuela, boolean nombreVisitante,
                                  String tipoVisita, boolean numeroCasa, MultipartFile fotoIne,
                                  boolean numeroPersonas, String observaciones) {
        Map<String, Object> body = new HashMap<>();

        try {
            // Validar campos obligatorios
            if (tipoVisita == null || tipoVisita.trim().isEmpty()) {
                throw new RuntimeException("El tipo de visita es obligatorio");
            }

            // Buscar la visita asociada
            Visit visit = visitRepository.findById(visitId)
                    .orElseThrow(() -> new RuntimeException("Visita no encontrada"));

            // Convertir imágenes a byte[]
            byte[] fotoPlacasBytes = (fotoPlacas != null && !fotoPlacas.isEmpty()) ? fotoPlacas.getBytes() : null;
            byte[] fotoCajuelaBytes = (fotoCajuela != null && !fotoCajuela.isEmpty()) ? fotoCajuela.getBytes() : null;
            byte[] fotoIneBytes = (fotoIne != null && !fotoIne.isEmpty()) ? fotoIne.getBytes() : null;

            // Crear el objeto Report
            Report report = new Report(visit, observaciones, numeroPersonas, fotoIneBytes,
                    numeroCasa, tipoVisita, nombreVisitante, fotoCajuelaBytes,
                    fotoPlacasBytes, palabraClave);

            // Guardar en la base de datos
            reportRepository.save(report);

            // Respuesta exitosa
            body.put("message", "Reporte guardado exitosamente");
            body.put("status", 201);
            return new ResponseEntity<>(body, HttpStatus.CREATED);

        } catch (RuntimeException | IOException e) {
            e.printStackTrace();
            body.put("message", "Error: " + e.getMessage());
            body.put("status", 400);
            return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            body.put("message", "Error inesperado: " + e.getMessage());
            body.put("status", 500);
            return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
