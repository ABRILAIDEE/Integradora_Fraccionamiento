package com.utez.edu.integradorafraccionamiento.auth;

import com.utez.edu.integradorafraccionamiento.auth.DTO.AuthLoginDTO;
import com.utez.edu.integradorafraccionamiento.modules.employee.Employee;
import com.utez.edu.integradorafraccionamiento.modules.employee.EmployeeDetailsImpl;
import com.utez.edu.integradorafraccionamiento.modules.employee.EmployeeRepository;
import com.utez.edu.integradorafraccionamiento.utils.CustomResponseEntity;
import com.utez.edu.integradorafraccionamiento.utils.security.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

// 9.- Crear servicio de Auth para el login
@Service
public class AuthService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CustomResponseEntity customResponseEntity;

    @Autowired
    private JWTUtil jwtUtil;

    @Transactional(readOnly = true)
    public ResponseEntity<?> login(AuthLoginDTO authLoginDTO) {
        // Buscar al empleado por su email
        Optional<Employee> found = employeeRepository.findByEmailAndPassword(
                authLoginDTO.getEmail(),
                authLoginDTO.getPassword()
        );

        if (found.isEmpty()) {
            return customResponseEntity.get404Response(); // Si no se encuentra el empleado
        } else {
            try {
                // Usamos EmployeeDetailsImpl en lugar de UserDetailsImpl
                EmployeeDetailsImpl employeeDetails = new EmployeeDetailsImpl(found);
                return customResponseEntity.getOkResponse(
                        "Inicio de sesión exitoso",
                        "OK",
                        200,
                        jwtUtil.generateToken(employeeDetails) // Generamos el token JWT
                );
            } catch (Exception e) {
                System.out.println(e.getMessage());
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }
}

