package com.utez.edu.integradorafraccionamiento.utils.security;

import com.utez.edu.integradorafraccionamiento.modules.employee.Employee;
import com.utez.edu.integradorafraccionamiento.modules.employee.EmployeeRepository;
import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import com.utez.edu.integradorafraccionamiento.modules.resident.ResidentRepository;
import com.utez.edu.integradorafraccionamiento.modules.OTPCode.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Primary
@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ResidentRepository residentRepository;

    @Autowired
    private OTPService otpService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Verificar si el username pertenece a un residente o a un empleado
        Optional<Resident> residentOptional = residentRepository.findByTelefono(username);
        if (residentOptional.isPresent()) {
            // Lógica de autenticación para residentes
            Resident resident = residentOptional.get();

            // Verificar si el OTP es válido
            if (resident.getOtpCode() != null && !resident.getOtpCode().isEmpty()) {
                String otpFromUser = resident.getOtpCode(); // OTP que el usuario proporciona

                // Verificar OTP
                String otpValidado = otpService.getOTP(username); // Obtener OTP almacenado

                if (otpValidado == null || !otpValidado.equals(otpFromUser)) {
                    throw new UsernameNotFoundException("OTP inválido o caducado para el teléfono: " + username);
                }
            }

            // Retornar el objeto User con el teléfono como username
            GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_RESIDENT");
            return new User(
                    resident.getTelefono(),
                    "",  // Si no se usa contraseña
                    Collections.singleton(authority)
            );
        }

        // Si no se encontró un residente, buscar un empleado
        Optional<Employee> employeeOptional = employeeRepository.findByEmail(username);
        if (employeeOptional.isPresent()) {
            // Lógica de autenticación para empleados
            Employee employee = employeeOptional.get();

            // Convertir el rol a GrantedAuthority
            GrantedAuthority authority = new SimpleGrantedAuthority(employee.getRol().getName());

            // Retornar el objeto User con el email como username
            return new User(
                    employee.getEmail(),
                    employee.getContrasena(),
                    Collections.singleton(authority)
            );
        }

        // Si no se encontró ni residente ni empleado, lanzar excepción
        throw new UsernameNotFoundException("Usuario no encontrado: " + username);
    }
}
