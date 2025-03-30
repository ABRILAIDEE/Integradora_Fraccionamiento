package com.utez.edu.integradorafraccionamiento.security;

import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import com.utez.edu.integradorafraccionamiento.modules.resident.ResidentRepository;
import com.utez.edu.integradorafraccionamiento.modules.OTPCode.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class ResidentDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private ResidentRepository residentRepository;

    @Autowired
    private OTPService otpService;

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        // Buscar al residente por teléfono
        Resident resident = residentRepository.findByTelefono(phoneNumber)
                .orElseThrow(() -> new UsernameNotFoundException("No se encontró el residente con ese teléfono"));

        // Verificar si el OTP está presente y no ha caducado
        if (resident.getOtpCode() != null && !resident.getOtpCode().isEmpty()) {
            String otpFromUser = resident.getOtpCode(); // Esto sería el OTP que el usuario proporcionó para la validación

            // Verificar el OTP usando el servicio OTPService
            String otpValidado = otpService.getOTP(phoneNumber);  // Obtener el OTP almacenado para este teléfono

            if (otpValidado == null || !otpValidado.equals(otpFromUser)) {
                // Si el OTP no es válido o ha caducado, lanzamos una excepción
                throw new UsernameNotFoundException("OTP inválido o caducado para el teléfono: " + phoneNumber);
            }
        }

        // Convertir el rol del residente a GrantedAuthority
        return new User(
                resident.getTelefono(),  // Usamos el teléfono como el nombre de usuario
                "",                      // Si no usas contraseña, puedes dejarlo vacío o manejarlo como lo necesites.
                Collections.singleton(new SimpleGrantedAuthority("ROLE_RESIDENT"))
        );
    }
}
