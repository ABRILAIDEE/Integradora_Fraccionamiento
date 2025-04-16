package com.utez.edu.integradorafraccionamiento.modules.resident;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.utez.edu.integradorafraccionamiento.modules.OTPCode.OTPService;
import com.utez.edu.integradorafraccionamiento.utils.CustomResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    // Inyección de las propiedades de Twilio desde application.properties
    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String fromPhone;

    @Autowired
    private OTPService otpService; // Servicio para generar y validar OTP
    @Autowired
    private CustomResponseEntity customResponseEntity;

    // Método para obtener todos los residentes
    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll() {
        List<Resident> list = residentRepository.findAll();
        Map<String, Object> body = new HashMap<>();

        body.put("message", list.isEmpty() ? "Aun no hay registros" : "Operacion realizada exitosamente");
        body.put("status", 200);
        body.put("data", list);

        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    // Método para buscar un residente por ID
    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(long id) {
        Resident found = residentRepository.findById(id);
        Map<String, Object> body = new HashMap<>();

        body.put("message", found == null ? "Recurso no encontrado" : "Operacion realizada exitosamente");
        body.put("status", found == null ? 404 : 200);
        body.put("data", found);

        return new ResponseEntity<>(body, found == null ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    // Método para guardar un residente (registro)
    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ResponseEntity<?> save(Resident resident) {
        Map<String, Object> body = new HashMap<>();
        Resident saved = null;

        // Guardamos el residente en la base de datos
        try {
            saved = residentRepository.save(resident);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }

        body.put("message", saved != null ? "Registro realizado exitosamente" : "Error de registro");
        body.put("status", saved != null ? 201 : 400);
        return new ResponseEntity<>(body, saved != null ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST);
    }

    // Método para enviar un SMS usando Twilio (solo para autenticación)
    private void sendSMS(String phoneNumber, String otp) {
        try {
            Twilio.init(accountSid, authToken);

            // Enviamos el mensaje SMS al número de teléfono del residente
            Message message = Message.creator(
                    new com.twilio.type.PhoneNumber(phoneNumber),
                    new com.twilio.type.PhoneNumber(fromPhone),
                    "Su código de verificación es: " + otp
            ).create();

            System.out.println("Mensaje enviado a: " + phoneNumber + " con SID: " + message.getSid());
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error enviando SMS: " + e.getMessage());
        }
    }

    // Método para manejar la autenticación del residente (generación de OTP)
    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ResponseEntity<?> authenticate(String phoneNumber) {
        Map<String, Object> body = new HashMap<>();

        // Verificamos si el residente existe en la base de datos
        Optional<Resident> resident = residentRepository.findByTelefono(phoneNumber); // Asumiendo que el teléfono es único

        if (resident != null) {
            // Generamos el OTP y lo enviamos por SMS
            String otp = otpService.generateOTP();
            sendSMS(phoneNumber, otp);

            // Guardamos el OTP en la base de datos o en un almacenamiento temporal
            otpService.saveOTP(phoneNumber, otp);

            body.put("message", "Se ha enviado un código de verificación a su teléfono");
            body.put("status", 200);
            return new ResponseEntity<>(body, HttpStatus.OK);
        } else {
            body.put("message", "El residente no está registrado");
            body.put("status", 404);
            return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
        }
    }

    // Método para verificar el OTP ingresado por el residente (autenticación)
    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ResponseEntity<?> verifyOTP(String phoneNumber, String otpEntered) {
        Map<String, Object> body = new HashMap<>();

        // Recuperamos el OTP guardado en el almacenamiento temporal
        String storedOtp = otpService.getOTP(phoneNumber); // Recupera el OTP almacenado

        // Comparamos el OTP ingresado con el almacenado
        if (storedOtp != null && storedOtp.equals(otpEntered)) {
            // El OTP es válido, proceder con la autenticación
            body.put("message", "Código de verificación correcto");
            body.put("status", 200);
            return new ResponseEntity<>(body, HttpStatus.OK);
        } else {
            body.put("message", "Código de verificación incorrecto");
            body.put("status", 400);
            return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        }
    }

    // Método para actualizar los datos de un residente
    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ResponseEntity<?> update(Resident resident, long id) {
        Map<String, Object> body = new HashMap<>();
        Resident updated = null;

        // Verificamos si el residente existe antes de intentar actualizarlo
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
        } else {
            body.put("message", "El registro no existe");
            body.put("status", 404);
            return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        }
    }

    // Método para actualizar el estado de un residente
    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ResponseEntity<?> updateStatus(long id, String nuevoEstado) {
        Map<String, Object> body = new HashMap<>();
        Resident residente = residentRepository.findById(id);

        // Verificamos si el residente existe y actualizamos su estado
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

    public ResponseEntity<?> findByTelefono(String telefono) {
        Optional<Resident> optional = residentRepository.findByTelefono(telefono);
        if (optional.isEmpty())
            return customResponseEntity.get404Response();
        return customResponseEntity.getOkResponse("Residente encontrado", "OK", 200, optional.get());
    }

    public ResponseEntity<?> updateByTelefono(String telefono, Resident updated) {
        Optional<Resident> optional = residentRepository.findByTelefono(telefono);
        if (optional.isEmpty())
            return customResponseEntity.get404Response();

        Resident existing = optional.get();
        existing.setNombre(updated.getNombre());
        existing.setApellidos(updated.getApellidos());
        existing.setEdad(updated.getEdad());
        existing.setFechaNacimiento(updated.getFechaNacimiento());
        existing.setEmail(updated.getEmail());
        // etc.

        residentRepository.save(existing);
        return customResponseEntity.getOkResponse("Residente actualizado", "OK", 200, existing);
    }

    public Resident getResidentByTelefono(String telefono) {
        return residentRepository.findByTelefono(telefono)
                .orElse(null);
    }

}