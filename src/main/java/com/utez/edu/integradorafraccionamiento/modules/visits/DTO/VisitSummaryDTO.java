package com.utez.edu.integradorafraccionamiento.modules.visits.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

public class VisitSummaryDTO {
    private String nombreVisitante;
    private String tipoVisita;
    private LocalDate fecha;
    private LocalTime hora;
    private String descripcion;
    private String estado;

    public VisitSummaryDTO() {}

    public VisitSummaryDTO(String nombreVisitante, String tipoVisita, LocalDate fecha, LocalTime hora, String descripcion, String estado) {
        this.nombreVisitante = nombreVisitante;
        this.tipoVisita = tipoVisita;
        this.fecha = fecha;
        this.hora = hora;
        this.descripcion = descripcion;
        this.estado = estado;
    }

    // Getters y setters
    public String getNombreVisitante() { return nombreVisitante; }
    public void setNombreVisitante(String nombreVisitante) { this.nombreVisitante = nombreVisitante; }

    public String getTipoVisita() { return tipoVisita; }
    public void setTipoVisita(String tipoVisita) { this.tipoVisita = tipoVisita; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public LocalTime getHora() { return hora; }
    public void setHora(LocalTime hora) { this.hora = hora; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
