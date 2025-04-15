package com.utez.edu.integradorafraccionamiento.modules.visits;

import com.utez.edu.integradorafraccionamiento.modules.house.House;
import com.utez.edu.integradorafraccionamiento.modules.house.HouseRepository;
import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import com.utez.edu.integradorafraccionamiento.modules.resident.ResidentRepository;
import com.utez.edu.integradorafraccionamiento.modules.status.Status;
import com.utez.edu.integradorafraccionamiento.modules.status.StatusRepository;
import com.utez.edu.integradorafraccionamiento.modules.visits.DTO.VisitSummaryDTO;
import com.utez.edu.integradorafraccionamiento.utils.CustomResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
import java.util.stream.Collectors;

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
    @Autowired
    private CustomResponseEntity customResponseEntity;

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

    //Encontrar visitas pendientes
    public ResponseEntity<?> findPendingVisits() {
        List<Visit> pendingVisits = visitRepository.findByStatusId(1L); // 1 representa "Pendiente"
        return new ResponseEntity<>(pendingVisits, HttpStatus.OK);
    }

    //Encontrar visitas en progreso
    public ResponseEntity<?> findInProgressVisits() {
        List<Visit> progressVisits = visitRepository.findByStatusId(2L); // 2 representa "Pendiente"
        return new ResponseEntity<>(progressVisits, HttpStatus.OK);
    }


    // SERVICE PARA REGRESAR QR
    public Visit saveAndReturnVisit(LocalDate fecha, LocalTime hora, int numeroPersonas, String descripcion,
                                    String tipoVisita, String placasVehiculo, String palabraClave,
                                    String nombreVisitante, Long residentId, Long houseId, Long statusId,
                                    MultipartFile fotoPlacas, MultipartFile fotoCajuela, MultipartFile fotoIne) throws IOException {

        if (descripcion == null || descripcion.trim().isEmpty()) {
            throw new RuntimeException("La descripción no puede ser nula o vacía");
        }

        Resident resident = residentRepository.findById(residentId)
                .orElseThrow(() -> new RuntimeException("Residente no encontrado"));
        House house = houseRepository.findById(houseId)
                .orElseThrow(() -> new RuntimeException("Casa no encontrada"));
        Status status = statusRepository.findById(Math.toIntExact(statusId))
                .orElseThrow(() -> new RuntimeException("Estado no encontrado"));

        byte[] fotoPlacasBytes = (fotoPlacas != null && !fotoPlacas.isEmpty()) ? fotoPlacas.getBytes() : null;
        byte[] fotoCajuelaBytes = (fotoCajuela != null && !fotoCajuela.isEmpty()) ? fotoCajuela.getBytes() : null;
        byte[] fotoIneBytes = (fotoIne != null && !fotoIne.isEmpty()) ? fotoIne.getBytes() : null;

        Visit visit = new Visit(status, house, resident, fotoIneBytes, fotoCajuelaBytes, fotoPlacasBytes,
                nombreVisitante, palabraClave, placasVehiculo, tipoVisita, descripcion,
                numeroPersonas, hora, fecha);

        return visitRepository.save(visit); // Devuelve la entidad con su ID
    }

    //Incrementar idStatus
    public ResponseEntity<?> avanzarEstado(long visitaId) {
        Optional<Visit> optionalVisit = visitRepository.findById(visitaId);
        if (optionalVisit.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Visita no encontrada");
        }

        Visit visita = optionalVisit.get();
        int estadoActualId = visita.getStatus().getId();

        if (estadoActualId >= 3) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La visita ya está en estado finalizado.");
        }

        int nuevoEstadoId = estadoActualId + 1;
        Optional<Status> nuevoStatus = statusRepository.findById(nuevoEstadoId);
        if (nuevoStatus.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se encontró el nuevo estado.");
        }

        visita.setStatus(nuevoStatus.get());
        visitRepository.save(visita);

        return ResponseEntity.ok("Estado actualizado correctamente a: " + nuevoStatus.get().getName());
    }

    public ResponseEntity<?> findPendingVisitById(Long visitId) {
        Status status = new Status();
        status.setId(1); // Estado "Pendiente"

        Optional<Visit> visit = visitRepository.findByIdAndStatus(visitId, status);
        return visit.isPresent()
                ? new ResponseEntity<>(visit.get(), HttpStatus.OK)
                : new ResponseEntity<>("Visita no encontrada o estado incorrecto", HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> findInProgressVisitById(Long visitId) {
        Status status = new Status();
        status.setId(2); // Estado "En Progreso"

        Optional<Visit> visit = visitRepository.findByIdAndStatus(visitId, status);
        return visit.isPresent()
                ? new ResponseEntity<>(visit.get(), HttpStatus.OK)
                : new ResponseEntity<>("Visita no encontrada o estado incorrecto", HttpStatus.NOT_FOUND);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findMyVisits(Authentication authentication) {
        String telefono = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<Resident> optionalResident = residentRepository.findByTelefono(telefono);
        if (optionalResident.isEmpty()) {
            return customResponseEntity.get404Response();
        }

        Resident resident = optionalResident.get();
        List<Visit> visitas = visitRepository.findByResidentId(resident.getId());

        List<VisitSummaryDTO> visitasDTO = visitas.stream().map(visit ->
                new VisitSummaryDTO(
                        visit.getNombreVisitante(),
                        visit.getTipoVisita(),
                        visit.getFecha(),
                        visit.getHora(),
                        visit.getDescripcion(),
                        visit.getStatus().getName()
                )
        ).collect(Collectors.toList());

        Map<String, Object> body = new HashMap<>();
        body.put("message", visitasDTO.isEmpty() ? "No hay visitas registradas" : "Operación exitosa");
        body.put("status", 200);
        body.put("data", visitasDTO);

        return new ResponseEntity<>(body, HttpStatus.OK);
    }


}
