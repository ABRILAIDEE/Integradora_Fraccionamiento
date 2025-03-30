package com.utez.edu.integradorafraccionamiento.auth;

import com.utez.edu.integradorafraccionamiento.auth.DTO.AuthLoginDTO;
import com.utez.edu.integradorafraccionamiento.auth.DTO.AuthMobileDTO;
import com.utez.edu.integradorafraccionamiento.auth.DTO.OtpVerificationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 10.- Crear el controller para Auth
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Login endpoint
    @PostMapping("")
    public ResponseEntity<?> login(@RequestBody AuthLoginDTO authLoginDTO) {
        return authService.login(authLoginDTO);
    }

    // Enviar OTP a través de móvil
    @PostMapping("/send-code")
    public ResponseEntity<?> sendOtp(@RequestBody AuthMobileDTO authMobileDTO) {
        // Llamamos al servicio para enviar el código OTP
        return authService.sendOtp(authMobileDTO);
    }

    // Verificar OTP
    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpVerificationDTO otpVerificationDTO) {
        // Llamamos al servicio para verificar el OTP
        return authService.verifyOtp(otpVerificationDTO);
    }
}