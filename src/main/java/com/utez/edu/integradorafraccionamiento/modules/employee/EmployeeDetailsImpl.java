package com.utez.edu.integradorafraccionamiento.modules.employee;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

// 3.- Crear la implementación de EmployeeDetails
public class EmployeeDetailsImpl implements UserDetails {

    private Optional<Employee> employee;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();  // Usamos BCryptPasswordEncoder

    public EmployeeDetailsImpl(Optional<Employee> employee) {
        this.employee = employee;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(employee.get().getRol().getName()));
    }

    @Override
    public String getPassword() {
        return employee.get().getContrasena();
    }

    @Override
    public String getUsername() {
        return employee.get().getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return "Activo".equals(employee.get().getEstado());
    }

    // Método adicional para verificar contraseñas
    public boolean checkPassword(String rawPassword) {
        return passwordEncoder.matches(rawPassword, employee.get().getContrasena());
    }
}


