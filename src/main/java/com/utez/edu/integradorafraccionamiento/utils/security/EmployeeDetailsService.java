package com.utez.edu.integradorafraccionamiento.utils.security;

import com.utez.edu.integradorafraccionamiento.modules.employee.Employee;
import com.utez.edu.integradorafraccionamiento.modules.employee.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

// 4.- Crear EmployeeDetailsService para el manejo de autorizaciones
@Service
public class EmployeeDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Buscar el empleado por email (o teléfono si prefieres usarlo como nombre de usuario)
        Optional<Employee> employee = employeeRepository.findByEmail(username);  // Suponiendo que "username" es el email

        // Verificar si el empleado no está presente
        if (employee.isEmpty()) {
            throw new UsernameNotFoundException("Empleado no encontrado: " + username);
        }

        // Convertir el rol a GrantedAuthority
        GrantedAuthority authority = new SimpleGrantedAuthority(employee.get().getRol().getName()); // Asumiendo que "getName()" devuelve el nombre del rol

        // Retornar el objeto User con las credenciales del empleado y la autoridad
        return new User(
                employee.get().getEmail(),           // Usando el email como nombre de usuario
                employee.get().getContrasena(),      // Contraseña del empleado
                Collections.singleton(authority)  // Autoridad del rol
        );
    }
}