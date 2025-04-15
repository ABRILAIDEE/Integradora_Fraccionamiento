package com.utez.edu.integradorafraccionamiento.auth;

import com.utez.edu.integradorafraccionamiento.auth.DTO.AuthLoginDTO;
import com.utez.edu.integradorafraccionamiento.auth.DTO.AuthMobileDTO;
import com.utez.edu.integradorafraccionamiento.auth.DTO.OtpVerificationDTO;
import com.utez.edu.integradorafraccionamiento.modules.OTPCode.OTPService;
import com.utez.edu.integradorafraccionamiento.modules.employee.Employee;
import com.utez.edu.integradorafraccionamiento.modules.employee.EmployeeDetailsImpl;
import com.utez.edu.integradorafraccionamiento.modules.employee.EmployeeRepository;
import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import com.utez.edu.integradorafraccionamiento.modules.resident.ResidentRepository;
import com.utez.edu.integradorafraccionamiento.utils.CustomResponseEntity;
import com.utez.edu.integradorafraccionamiento.utils.security.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ResidentRepository residentRepository;

    @Autowired
    private OTPService otpService;

    @Autowired
    private CustomResponseEntity customResponseEntity;

    @Autowired
    private JWTUtil jwtUtil;

    /**
     * Método de inicio de sesión para empleados (correo y contraseña).
     */
    @Transactional(readOnly = true)
    public ResponseEntity<?> login(AuthLoginDTO authLoginDTO) {
        Optional<Employee> found = employeeRepository.findByEmailAndPassword(
                authLoginDTO.getEmail(),
                authLoginDTO.getPassword()
        );

        if (found.isEmpty()) {
            return customResponseEntity.get404Response(); // Empleado no encontrado
        }

        Employee employee = found.get();

        // 🚨 Nueva validación de estado
        if (!"Activo".equalsIgnoreCase(employee.getEstado())) {
            return customResponseEntity.get403Response("Tu cuenta está inactiva");
        }

        try {
            EmployeeDetailsImpl employeeDetails = new EmployeeDetailsImpl(found);
            return customResponseEntity.getOkResponse(
                    "Inicio de sesión exitoso",
                    "OK",
                    200,
                    jwtUtil.generateToken(employeeDetails) // Generar JWT
            );
        } catch (Exception e) {
            e.printStackTrace();
            return customResponseEntity.get400Response();
        }
    }


    /**
     * Enviar código OTP a un residente basado en su número de teléfono.
     */
    @Transactional
    public ResponseEntity<?> sendOtp(AuthMobileDTO authMobileDTO) {
        Optional<Resident> resident = residentRepository.findByTelefono(authMobileDTO.getTelefono());

        if (resident.isEmpty()) {
            return customResponseEntity.get404Response(); // Residente no encontrado
        }

        if (!"Activo".equalsIgnoreCase(resident.get().getEstado())) {
            return customResponseEntity.get403Response("Tu cuenta está inactiva");
        }


        // Generar el código OTP
        String otp = otpService.generateOTP();

        // Guardar el OTP en la base de datos o almacenamiento temporal
        otpService.saveOTP(authMobileDTO.getTelefono(), otp);

        // Enviar el OTP por SMS utilizando Twilio
        boolean sent = otpService.sendOtpToPhoneNumber(authMobileDTO.getTelefono(), otp);

        if (sent) {
            return customResponseEntity.getOkResponse("Código OTP enviado exitosamente", "OK", 200, null);
        } else {
            return customResponseEntity.get400Response();
        }
    }

    /**
     * Verificar el código OTP ingresado por el residente.
     */

    @Transactional
    public ResponseEntity<?> verifyOtp(OtpVerificationDTO otpVerificationDTO) {
        // Obtener el OTP guardado
        String storedOtp = otpService.getOTP(otpVerificationDTO.getTelefono());

        if (storedOtp == null || !storedOtp.equals(otpVerificationDTO.getCodigo())) {
            return customResponseEntity.get400Response();
        }

        // Eliminar OTP después de su verificación para evitar su reutilización
        otpService.saveOTP(otpVerificationDTO.getTelefono(), null); // Opcionalmente, podrías eliminarlo del almacenamiento

        Optional<Resident> resident = residentRepository.findByTelefono(otpVerificationDTO.getTelefono());
        if (resident.isEmpty()) {
            return customResponseEntity.get404Response(); // Residente no encontrado
        }

        if (!"Activo".equalsIgnoreCase(resident.get().getEstado())) {
            return customResponseEntity.get403Response("Tu cuenta está inactiva");
        }

// Generar JWT para el residente
        return customResponseEntity.getOkResponse(
                "Autenticación exitosa",
                "OK",
                200,
                jwtUtil.generateTokenForResident(resident.get())
        );
    }
}
