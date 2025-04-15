package com.utez.edu.integradorafraccionamiento.modules.house;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import com.utez.edu.integradorafraccionamiento.modules.visits.Visit;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "house")
public class House {

    //---------------- ATRIBUTOS PROPIOS DE LA CLASE ----------------
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "direccion", nullable = false)
    private String direccion;

    @Column(name = "calle", nullable = false)
    private String calle;

    @Column(name = "numero_casa", nullable = false, unique = true)
    private String numeroCasa;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] foto;  // Aquí se almacenará la imagen como BLOB

    @Column(name = "estado", nullable = false)
    private String estado = "Activa";

    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Resident> residentes;

    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Visit> visitas;

    //---------------- CONSTRUCTORES ----------------
    //1.- Constructor vacío
    public House() {
    }

    //2.- Constructor con parámetros con atributos de la clase
    public House(String direccion, String calle, String numeroCasa, String descripcion, String estado, byte[] foto) {
        this.direccion = direccion;
        this.calle = calle;
        this.numeroCasa = numeroCasa;
        this.descripcion = descripcion;
        this.foto = foto;
        this.estado = estado;
    }

    //3.- Constructor con parametros de llave y atributos de la clase
    public House(long id, String direccion, String calle, String numeroCasa, String descripcion, String estado, byte[] foto) {
        this.id = id;
        this.direccion = direccion;
        this.calle = calle;
        this.numeroCasa = numeroCasa;
        this.descripcion = descripcion;
        this.foto = foto;
        this.estado = estado;
    }


    //4.- Constructor con relaciones y atributos de la clase
    public House(String direccion, String calle, String numeroCasa, String descripcion, String estadom, byte[] foto, List<Resident> residentes, List<Visit> visitas) {
        this.direccion = direccion;
        this.calle = calle;
        this.numeroCasa = numeroCasa;
        this.descripcion = descripcion;
        this.foto = foto;
        this.estado = estado;
        this.residentes = residentes;
        this.visitas = visitas;
    }

    //5.- Constructor con todos los atributos de la clase, atributos de relacion y llave de la clase
    public House(long id, String direccion, String calle, String numeroCasa, String descripcion, String estado, byte[] foto, List<Resident> residentes, List<Visit> visitas) {
        this.id = id;
        this.direccion = direccion;
        this.calle = calle;
        this.numeroCasa = numeroCasa;
        this.descripcion = descripcion;
        this.foto = foto;
        this.residentes = residentes;
        this.visitas = visitas;
        this.estado = estado;

    }

    // ---------- GETTERS Y SETTERS ---------
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getNumeroCasa() {
        return numeroCasa;
    }

    public void setNumeroCasa(String numeroCasa) {
        this.numeroCasa = numeroCasa;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public byte[] getFoto() {
        return foto;
    }

    public void setFoto(byte[] foto) {
        this.foto = foto;
    }

    public List<Resident> getResidentes() {
        return residentes;
    }

    public void setResidentes(List<Resident> residentes) {
        this.residentes = residentes;
    }

    public List<Visit> getVisitas() {
        return visitas;
    }

    public void setVisitas(List<Visit> visitas) {
        this.visitas = visitas;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

}
