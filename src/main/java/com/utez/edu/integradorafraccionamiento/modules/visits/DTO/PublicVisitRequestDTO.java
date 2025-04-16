package com.utez.edu.integradorafraccionamiento.modules.visits.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

public class PublicVisitRequestDTO {
    private LocalDate fecha;
    private LocalTime hora;
    private int numeroPersonas;
    private String descripcion;
    private String tipoVisita;
    private String placasVehiculo;
    private String palabraClave;
    private String nombreVisitante;

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public int getNumeroPersonas() {
        return numeroPersonas;
    }

    public void setNumeroPersonas(int numeroPersonas) {
        this.numeroPersonas = numeroPersonas;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipoVisita() {
        return tipoVisita;
    }

    public void setTipoVisita(String tipoVisita) {
        this.tipoVisita = tipoVisita;
    }

    public String getPlacasVehiculo() {
        return placasVehiculo;
    }

    public void setPlacasVehiculo(String placasVehiculo) {
        this.placasVehiculo = placasVehiculo;
    }

    public String getPalabraClave() {
        return palabraClave;
    }

    public void setPalabraClave(String palabraClave) {
        this.palabraClave = palabraClave;
    }

    public String getNombreVisitante() {
        return nombreVisitante;
    }

    public void setNombreVisitante(String nombreVisitante) {
        this.nombreVisitante = nombreVisitante;
    }
}
