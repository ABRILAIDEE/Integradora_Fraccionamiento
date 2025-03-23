package com.utez.edu.integradorafraccionamiento.modules.visits;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.utez.edu.integradorafraccionamiento.modules.house.House;
import com.utez.edu.integradorafraccionamiento.modules.report.Report;
import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import com.utez.edu.integradorafraccionamiento.modules.status.Status;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "visit")
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "hora", nullable = false)
    private LocalTime hora;

    @Column(name = "numero_personas", nullable = false)
    private int numeroPersonas;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "tipo_visita", nullable = false)
    private String tipoVisita;

    @Column(name = "placas_vehiculo", nullable = false)
    private String placasVehiculo;

    @Column(name = "palabra_clave", nullable = true)
    private String palabraClave;

    @Column(name = "nombre_visitante", nullable = false)
    private String nombreVisitante;

    // Campos para almacenar fotos como BLOB
    @Lob
    @Column(name = "foto_placas", columnDefinition = "LONGBLOB")
    private byte[] fotoPlacas;  // Usando byte[] para la imagen

    @Lob
    @Column(name = "foto_cajuela", columnDefinition = "LONGBLOB")
    private byte[] fotoCajuela;

    @Lob
    @Column(name = "foto_ine", columnDefinition = "LONGBLOB")
    private byte[] fotoIne;

    // RELACIONES
    @ManyToOne
    @JoinColumn(name = "resident_id", referencedColumnName = "id", nullable = false)
    private Resident resident;

    @ManyToOne
    @JoinColumn(name = "house_id", nullable = false)
    private House house;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    private Status status;

    @OneToOne(mappedBy = "visit", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Report report;

    //1.- Constructor vacío
    public Visit() {
    }

    //2.- Constructor con parámetros con atributos de la clase
    public Visit(LocalDate fecha, LocalTime hora, int numeroPersonas, String descripcion, String tipoVisita, String placasVehiculo, String palabraClave, String nombreVisitante, byte[] fotoPlacas, byte[] fotoCajuela, byte[] fotoIne) {
        this.fecha = fecha;
        this.hora = hora;
        this.numeroPersonas = numeroPersonas;
        this.descripcion = descripcion;
        this.tipoVisita = tipoVisita;
        this.placasVehiculo = placasVehiculo;
        this.palabraClave = palabraClave;
        this.nombreVisitante = nombreVisitante;
        this.fotoPlacas = fotoPlacas;
        this.fotoCajuela = fotoCajuela;
        this.fotoIne = fotoIne;
    }

    //3.- Constructor con parametros de llave y atributos de la clase
    public Visit(long id, LocalDate fecha, LocalTime hora, int numeroPersonas, String descripcion, String tipoVisita, String placasVehiculo, String palabraClave, String nombreVisitante, byte[] fotoPlacas, byte[] fotoCajuela, byte[] fotoIne) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.numeroPersonas = numeroPersonas;
        this.descripcion = descripcion;
        this.tipoVisita = tipoVisita;
        this.placasVehiculo = placasVehiculo;
        this.palabraClave = palabraClave;
        this.nombreVisitante = nombreVisitante;
        this.fotoPlacas = fotoPlacas;
        this.fotoCajuela = fotoCajuela;
        this.fotoIne = fotoIne;
    }

    //4.- Constructor con relaciones y atributos de la clase
    public Visit(Status status, House house, Resident resident, byte[] fotoIne, byte[] fotoCajuela, byte[] fotoPlacas, String nombreVisitante, String palabraClave, String placasVehiculo, String tipoVisita, String descripcion, int numeroPersonas, LocalTime hora, LocalDate fecha) {
        this.status = status;
        this.house = house;
        this.resident = resident;
        this.fotoIne = fotoIne;
        this.fotoCajuela = fotoCajuela;
        this.fotoPlacas = fotoPlacas;
        this.nombreVisitante = nombreVisitante;
        this.palabraClave = palabraClave;
        this.placasVehiculo = placasVehiculo;
        this.tipoVisita = tipoVisita;
        this.descripcion = descripcion;
        this.numeroPersonas = numeroPersonas;
        this.hora = hora;
        this.fecha = fecha;
    }

    //5.- Constructor con todos los atributos de la clase, atributos de relacion y llave de la clase
    public Visit(long id, LocalDate fecha, LocalTime hora, int numeroPersonas, String descripcion, String tipoVisita, String placasVehiculo, String palabraClave, String nombreVisitante, byte[] fotoPlacas, byte[] fotoCajuela, byte[] fotoIne, Resident resident, House house, Status status) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.numeroPersonas = numeroPersonas;
        this.descripcion = descripcion;
        this.tipoVisita = tipoVisita;
        this.placasVehiculo = placasVehiculo;
        this.palabraClave = palabraClave;
        this.nombreVisitante = nombreVisitante;
        this.fotoPlacas = fotoPlacas;
        this.fotoCajuela = fotoCajuela;
        this.fotoIne = fotoIne;
        this.resident = resident;
        this.house = house;
        this.status = status;
    }

    // GETTERS Y SETTERS
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public byte[] getFotoPlacas() {
        return fotoPlacas;
    }

    public void setFotoPlacas(byte[] fotoPlacas) {
        this.fotoPlacas = fotoPlacas;
    }

    public byte[] getFotoCajuela() {
        return fotoCajuela;
    }

    public void setFotoCajuela(byte[] fotoCajuela) {
        this.fotoCajuela = fotoCajuela;
    }

    public byte[] getFotoIne() {
        return fotoIne;
    }

    public void setFotoIne(byte[] fotoIne) {
        this.fotoIne = fotoIne;
    }

    public Resident getResident() {
        return resident;
    }

    public void setResident(Resident resident) {
        this.resident = resident;
    }

    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
