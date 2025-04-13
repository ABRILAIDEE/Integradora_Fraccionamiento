package com.utez.edu.integradorafraccionamiento.modules.house;

import com.utez.edu.integradorafraccionamiento.modules.house.House;
import com.utez.edu.integradorafraccionamiento.modules.house.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class HouseService {

    @Autowired
    private HouseRepository houseRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll() {
        List<House> list = houseRepository.findAll();
        Map<String, Object> body = new HashMap<>();
        body.put("message", list.isEmpty() ? "Aun no hay registros" : "Operacion realizada exitosamente");
        body.put("status", 200);
        body.put("data", list);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(long id) {
        House found = houseRepository.findById(id);
        Map<String, Object> body = new HashMap<>();
        body.put("message", found == null ? "Recurso no encontrado" : "Operacion realizada exitosamente");
        body.put("status", found == null ? 404 : 200);
        body.put("data", found);
        return new ResponseEntity<>(body, found == null ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @Transactional(rollbackFor = {IOException.class, Exception.class})
    public ResponseEntity<?> save(String direccion, String calle, String numeroCasa, String descripcion, MultipartFile foto) {
        Map<String, Object> body = new HashMap<>();
        House saved = null;

        try {
            byte[] fotoBytes = foto.getBytes();
            House house = new House(direccion, calle, numeroCasa, descripcion, fotoBytes);
            saved = houseRepository.save(house);
        } catch (IOException e) {
            e.printStackTrace();
            body.put("message", "Error al cargar la imagen");
            body.put("status", 500);
            return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        body.put("message", saved != null ? "Registro realizado exitosamente" : "Error de registro");
        body.put("status", saved != null ? 201 : 400);
        return new ResponseEntity<>(body, saved != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {IOException.class, Exception.class})
    public ResponseEntity<?> update(long id, String direccion, String calle, String numeroCasa, String descripcion, MultipartFile foto) {
        Map<String, Object> body = new HashMap<>();
        House updated = null;

        House house = houseRepository.findById(id);
        if (house != null) {
            try {
                house.setDireccion(direccion);
                house.setCalle(calle);
                house.setNumeroCasa(numeroCasa);
                house.setDescripcion(descripcion);

                // Solo actualizar la foto si se envió
                if (foto != null && !foto.isEmpty()) {
                    byte[] fotoBytes = foto.getBytes();
                    house.setFoto(fotoBytes);
                }

                updated = houseRepository.save(house);
            } catch (IOException e) {
                e.printStackTrace();
                body.put("message", "Error al cargar la imagen");
                body.put("status", 500);
                return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            body.put("message", updated != null ? "Actualizacion realizada correctamente" : "Error de actualizacion");
            body.put("status", updated != null ? 201 : 400);
            return new ResponseEntity<>(body, updated != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
        } else {
            body.put("message", "El registro no existe");
            body.put("status", 404);
            return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        }
    }

}
