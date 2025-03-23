package com.utez.edu.integradorafraccionamiento.modules.report;

import com.utez.edu.integradorafraccionamiento.modules.house.House;
import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import com.utez.edu.integradorafraccionamiento.modules.status.Status;
import com.utez.edu.integradorafraccionamiento.modules.visits.Visit;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "palabra_clave", nullable = true)
    private String palabraClave;  // Opcional

    @Lob
    @Column(name = "foto_placas", columnDefinition = "LONGBLOB")
    private byte[] fotoPlacas; // Opcional (Imagen)

    @Lob
    @Column(name = "foto_cajuela", columnDefinition = "LONGBLOB")
    private byte[] fotoCajuela; // Opcional (Imagen)

    @Column(name = "nombre_visitante", nullable = false)
    private boolean nombreVisitante; // Obligatorio (Check)

    @Column(name = "tipo_visita", nullable = false)
    private String tipoVisita; // Picker (Opciones: "Técnica" o "Familiar")

    @Column(name = "numero_casa", nullable = false)
    private boolean numeroCasa; // Obligatorio (Check)

    @Lob
    @Column(name = "foto_ine", columnDefinition = "LONGBLOB")
    private byte[] fotoIne; // Opcional (Imagen)

    @Column(name = "numero_personas", nullable = false)
    private boolean numeroPersonas; // Obligatorio (Check)

    @Column(name = "observaciones", nullable = true)
    private String observaciones; // Opcional (TextArea)

    @OneToOne
    @JoinColumn(name = "visit_id", nullable = false) // Relación 1 a 1 con Visit
    private Visit visit;

    //1.- Constructor vacío
    public Report() {
    }

    //2.- Constructor con parámetros con atributos de la clase
    public Report(String palabraClave, byte[] fotoPlacas, byte[] fotoCajuela, boolean nombreVisitante, String tipoVisita, boolean numeroCasa, byte[] fotoIne, boolean numeroPersonas, String observaciones) {
        this.palabraClave = palabraClave;
        this.fotoPlacas = fotoPlacas;
        this.fotoCajuela = fotoCajuela;
        this.nombreVisitante = nombreVisitante;
        this.tipoVisita = tipoVisita;
        this.numeroCasa = numeroCasa;
        this.fotoIne = fotoIne;
        this.numeroPersonas = numeroPersonas;
        this.observaciones = observaciones;
    }

    //3.- Constructor con parametros de llave y atributos de la clase
    public Report(long id, String palabraClave, byte[] fotoPlacas, byte[] fotoCajuela, boolean nombreVisitante, String tipoVisita, boolean numeroCasa, byte[] fotoIne, boolean numeroPersonas, String observaciones) {
        this.id = id;
        this.palabraClave = palabraClave;
        this.fotoPlacas = fotoPlacas;
        this.fotoCajuela = fotoCajuela;
        this.nombreVisitante = nombreVisitante;
        this.tipoVisita = tipoVisita;
        this.numeroCasa = numeroCasa;
        this.fotoIne = fotoIne;
        this.numeroPersonas = numeroPersonas;
        this.observaciones = observaciones;
    }

    //4.- Constructor con relaciones y atributos de la clase
    public Report(Visit visit, String observaciones, boolean numeroPersonas, byte[] fotoIne, boolean numeroCasa, String tipoVisita, boolean nombreVisitante, byte[] fotoCajuela, byte[] fotoPlacas, String palabraClave) {
        this.visit = visit;
        this.observaciones = observaciones;
        this.numeroPersonas = numeroPersonas;
        this.fotoIne = fotoIne;
        this.numeroCasa = numeroCasa;
        this.tipoVisita = tipoVisita;
        this.nombreVisitante = nombreVisitante;
        this.fotoCajuela = fotoCajuela;
        this.fotoPlacas = fotoPlacas;
        this.palabraClave = palabraClave;
    }


    //5.- Constructor con todos los atributos de la clase, atributos de relacion y llave de la clase
    public Report(long id, String palabraClave, byte[] fotoPlacas, byte[] fotoCajuela, boolean nombreVisitante, String tipoVisita, boolean numeroCasa, byte[] fotoIne, boolean numeroPersonas, String observaciones, Visit visit) {
        this.id = id;
        this.palabraClave = palabraClave;
        this.fotoPlacas = fotoPlacas;
        this.fotoCajuela = fotoCajuela;
        this.nombreVisitante = nombreVisitante;
        this.tipoVisita = tipoVisita;
        this.numeroCasa = numeroCasa;
        this.fotoIne = fotoIne;
        this.numeroPersonas = numeroPersonas;
        this.observaciones = observaciones;
        this.visit = visit;
    }

    // -------------- GETTERS Y SETTERS ------------
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPalabraClave() {
        return palabraClave;
    }

    public void setPalabraClave(String palabraClave) {
        this.palabraClave = palabraClave;
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

    public boolean isNombreVisitante() {
        return nombreVisitante;
    }

    public void setNombreVisitante(boolean nombreVisitante) {
        this.nombreVisitante = nombreVisitante;
    }

    public String getTipoVisita() {
        return tipoVisita;
    }

    public void setTipoVisita(String tipoVisita) {
        this.tipoVisita = tipoVisita;
    }

    public boolean isNumeroCasa() {
        return numeroCasa;
    }

    public void setNumeroCasa(boolean numeroCasa) {
        this.numeroCasa = numeroCasa;
    }

    public byte[] getFotoIne() {
        return fotoIne;
    }

    public void setFotoIne(byte[] fotoIne) {
        this.fotoIne = fotoIne;
    }

    public boolean isNumeroPersonas() {
        return numeroPersonas;
    }

    public void setNumeroPersonas(boolean numeroPersonas) {
        this.numeroPersonas = numeroPersonas;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit visit) {
        this.visit = visit;
    }
}
