package com.utez.edu.integradorafraccionamiento.auth.DTO;

//8.- Crear el DTO para el login
public class AuthLoginDTO {
    private String email;
    private String password;

    // Constructor vacío
    public AuthLoginDTO() {
    }

    // Constructor con parámetros
    public AuthLoginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getter y setter para 'email'
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter y setter para 'password'
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

