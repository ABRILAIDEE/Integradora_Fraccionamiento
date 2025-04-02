package com.utez.edu.integradorafraccionamiento.modules.visits;

import com.utez.edu.integradorafraccionamiento.modules.house.House;
import com.utez.edu.integradorafraccionamiento.modules.house.HouseRepository;
import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import com.utez.edu.integradorafraccionamiento.modules.resident.ResidentRepository;
import com.utez.edu.integradorafraccionamiento.modules.status.Status;
import com.utez.edu.integradorafraccionamiento.modules.status.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class VisitService {

    @Autowired
    private VisitRepository visitRepository;
    @Autowired
    private ResidentRepository residentRepository;
    @Autowired
    private StatusRepository statusRepository;
    @Autowired
    private HouseRepository houseRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll() {
        List<Visit> list = visitRepository.findAll();
        Map<String, Object> body = new HashMap<>();

        body.put("message", list.isEmpty() ? "Aun no hay registros" : "Operacion realizada exitosamente");
        body.put("status", 200);
        body.put("data", list);

        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(long id) {
        Optional<Visit> found = visitRepository.findById(id);
        Map<String, Object> body = new HashMap<>();

        body.put("message", found == null ? "Recurso no encontrado" : "Operacion realizada exitosamente");
        body.put("status", found == null ? 404 : 200);
        body.put("data", found);

        return new ResponseEntity<>(body, found == null ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @Transactional(rollbackFor = {IOException.class, SQLException.class, Exception.class})
    public ResponseEntity<?> save(LocalDate fecha, LocalTime hora, int numeroPersonas, String descripcion,
                                  String tipoVisita, String placasVehiculo, String palabraClave,
                                  String nombreVisitante, Long residentId, Long houseId, Long statusId,
                                  MultipartFile fotoPlacas, MultipartFile fotoCajuela, MultipartFile fotoIne) {
        Map<String, Object> body = new HashMap<>();

        try {
            // Verificar si 'descripcion' es nula o vacía
            if (descripcion == null || descripcion.trim().isEmpty()) {
                throw new RuntimeException("La descripción no puede ser nula o vacía");
            }

            // Buscar entidades relacionadas (Lanza excepción si no existen)
            Resident resident = residentRepository.findById(residentId)
                    .orElseThrow(() -> new RuntimeException("Residente no encontrado"));
            House house = houseRepository.findById(houseId)
                    .orElseThrow(() -> new RuntimeException("Casa no encontrada"));
            Status status = statusRepository.findById(Math.toIntExact(statusId))
                    .orElseThrow(() -> new RuntimeException("Estado no encontrado"));

            // Convertir imágenes a byte[] si están presentes
            byte[] fotoPlacasBytes = (fotoPlacas != null && !fotoPlacas.isEmpty()) ? fotoPlacas.getBytes() : null;
            byte[] fotoCajuelaBytes = (fotoCajuela != null && !fotoCajuela.isEmpty()) ? fotoCajuela.getBytes() : null;
            byte[] fotoIneBytes = (fotoIne != null && !fotoIne.isEmpty()) ? fotoIne.getBytes() : null;

            // Crear objeto Visit
            Visit visit = new Visit(status, house, resident, fotoIneBytes, fotoCajuelaBytes, fotoPlacasBytes,
                    nombreVisitante, palabraClave, placasVehiculo, tipoVisita, descripcion,
                    numeroPersonas, hora, fecha);

            // Guardar en la base de datos
            Visit saved = visitRepository.save(visit);

            // Respuesta exitosa
            body.put("message", "Visita registrada exitosamente");
            body.put("status", 201);
            return new ResponseEntity<>(body, HttpStatus.CREATED);

        } catch (RuntimeException | IOException e) {
            e.printStackTrace();  // Muestra el error completo en la consola

            // Usar System.out.println en vez de logger para registrar el error
            System.out.println("Error: " + e.getMessage());

            body.put("message", "Error: " + e.getMessage());
            body.put("status", 400);
            return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();  // Muestra el error completo en la consola

            // Usar System.out.println en vez de logger para registrar el error
            System.out.println("Error inesperado: " + e.getMessage());

            body.put("message", "Error inesperado: " + e.getMessage());
            body.put("status", 500);
            return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ResponseEntity<?> updateStatus(long id, Status nuevoEstado) {
        Map<String, Object> body = new HashMap<>();
        Optional<Visit> optionalVisit = visitRepository.findById(id);

        if (optionalVisit.isPresent()) {
            Visit visit = optionalVisit.get();
            visit.setStatus(nuevoEstado);

            try {
                visitRepository.save(visit);  // Guardar la visita con el nuevo estado
                body.put("message", "Estado actualizado correctamente");
                body.put("status", 200);
                return new ResponseEntity<>(body, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                body.put("message", "Error inesperado al actualizar el estado");
                body.put("status", 500);
                return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            body.put("message", "Visita no encontrada");
            body.put("status", 404);
            return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
        }
    }

    // SERVICIO PARA QR

    public ResponseEntity<String> validateVisit(Long visitId) {
        return visitRepository.findById(visitId)
                .map(visit -> {
                    if (visit.getStatus().getName().equals("Pendiente")) {
                        visit.getStatus().setName("En progreso");  // Actualiza el estado de la visita
                        visitRepository.save(visit);
                        return ResponseEntity.ok("QR válido, acceso permitido.");
                    }
                    return ResponseEntity.badRequest().body("QR inválido o visita caducada.");
                })
                .orElse(ResponseEntity.badRequest().body("Visita no encontrada."));
    }

    public ResponseEntity<?> verificarQR(long id) {
        Optional<Visit> optionalVisit = visitRepository.findById(id);
        if (optionalVisit.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Visita no encontrada.");
        }

        Visit visit = optionalVisit.get();
        int statusId = visit.getStatus().getId(); // Obtener ID del estado

        if (statusId == 1) {
            return ResponseEntity.ok(Map.of("nextStep", "entrada", "status", "En Progreso"));
        } else if (statusId == 2) {
            return ResponseEntity.ok(Map.of("nextStep", "salida", "status", "Terminada"));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("QR no válido.");
        }
    }

    // CAMBIAR ESTADO
    public ResponseEntity<?> cambiarEstado(long id) {
        Optional<Visit> optionalVisit = visitRepository.findById(id);
        if (optionalVisit.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Visita no encontrada.");
        }

        Visit visit = optionalVisit.get();
        int currentStatus = visit.getStatus().getId();

        if (currentStatus == 1) {
            visit.setStatus(new Status(2, "En Progreso")); // Cambia a "En Progreso"
        } else if (currentStatus == 2) {
            visit.setStatus(new Status(3, "Terminada")); // Cambia a "Terminada"
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se puede cambiar el estado.");
        }

        visitRepository.save(visit);
        return ResponseEntity.ok("Estado actualizado.");
    }

}
