package com.utez.edu.integradorafraccionamiento.modules.resident;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class ResidentService {

    @Autowired
    private ResidentRepository residentRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll() {
        List<Resident> list = residentRepository.findAll();
        Map<String, Object> body = new HashMap<>();

        body.put("message", list.isEmpty() ? "Aun no hay registros" : "Operacion realizada exitosamente");
        body.put("status", 200);
        body.put("data", list);

        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(long id) {
        Resident found = residentRepository.findById(id);
        Map<String, Object> body = new HashMap<>();

        body.put("message", found == null ? "Recurso no encontrado" : "Operacion realizada exitosamente");
        body.put("status", found == null ? 404 : 200);
        body.put("data", found);

        return new ResponseEntity<>(body, found == null ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ResponseEntity<?> save(Resident resident) {
        Map<String, Object> body = new HashMap<>();
        Resident saved = null;
        try {
            saved = residentRepository.save(resident);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
        body.put("message", saved != null ? "Registro realizado exitosamente" : "Error de registro");
        body.put("status", saved != null ? 201 : 400);
        return new ResponseEntity<>(body, saved != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ResponseEntity<?> update(Resident resident, long id) {
        Map<String, Object> body = new HashMap<>();
        Resident updated = null;

        if (residentRepository.findById(id) != null) {
            resident.setId(id);
            try {
                updated = residentRepository.save(resident);
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println(e.getMessage());
            }
            body.put("message", updated != null ? "Actualizacion realizada correctamente" : "Error de actualizacion");
            body.put("status", updated != null ? 201 : 400);
            return new ResponseEntity<>(body, updated != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
        }else {
            body.put("message", "El registro no existe");
            body.put("status", 404);
            return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ResponseEntity<?> updateStatus(long id, String nuevoEstado) {
        Map<String, Object> body = new HashMap<>();
        Resident residente = residentRepository.findById(id);

        if (residente != null) {
            residente.setEstado(nuevoEstado);
            try {
                residente = residentRepository.save(residente);
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println(e.getMessage());
            }
            body.put("message", residente != null ? "Estado actualizado correctamente a " + nuevoEstado : "Error al actualizar el estado");
            body.put("status", residente != null ? 200 : 400);
            return new ResponseEntity<>(body, residente != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
        } else {
            body.put("message", "Residente no encontrado");
            body.put("status", 404);
            return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        }
    }
}
