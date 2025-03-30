package com.utez.edu.integradorafraccionamiento.auth.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtpVerificationDTO {
    private String telefono;
    private String codigo;
}