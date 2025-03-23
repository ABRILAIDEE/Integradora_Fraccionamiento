package com.utez.edu.integradorafraccionamiento.modules.resident;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.utez.edu.integradorafraccionamiento.modules.house.House;
import com.utez.edu.integradorafraccionamiento.modules.rol.Rol;
import com.utez.edu.integradorafraccionamiento.modules.visits.Visit;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "resident")
public class Resident {

    //---------------- ATRIBUTOS PROPIOS DE LA CLASE ----------------
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "apellidos", nullable = false)
    private String apellidos;

    @Column(name = "edad", nullable = false)
    private int edad;

    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String telefono;

    @Column(name = "estado", nullable = false)
    private String estado = "Activo";

    @ManyToOne //Cuando esta vacio lo crea la misma entidad (Esta creando una columna de Relacion @ManyToOne)
    @JoinColumn(name = "house_id", nullable = false)
    private House house;

    @ManyToOne
    @JoinColumn(name = "id_rol", nullable = false)
    private Rol rol;

    @OneToMany(mappedBy = "resident")
    @JsonIgnore
    private List<Visit> visits;

    //---------------- CONSTRUCTORES ----------------
    //1.- Constructor vacío
    public Resident() {
    }


    //2.- Constructor con parámetros con atributos de la clase
    public Resident(String nombre, String apellidos, int edad, LocalDate fechaNacimiento, String email, String telefono, String estado) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.telefono = telefono;
        this.estado = estado;
    }

    //3.- Constructor con parametros de llave y atributos de la clase
    public Resident(long id, String nombre, String apellidos, int edad, LocalDate fechaNacimiento, String email, String telefono, String estado) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.telefono = telefono;
        this.estado = estado;
    }

    //4.- Constructor con relaciones y atributos de la clase
    public Resident(String nombre, String apellidos, int edad, LocalDate fechaNacimiento, String email, String telefono, String estado, House house, Rol rol, List<Visit> visits) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.telefono = telefono;
        this.estado = estado;
        this.house = house;
        this.rol = rol;
        this.visits = visits;
    }


    //5.- Constructor con todos los atributos de la clase, atributos de relacion y llave de la clase
    public Resident(long id, String nombre, String apellidos, int edad, LocalDate fechaNacimiento, String email, String telefono, String estado, House house, Rol rol, List<Visit> visits) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.telefono = telefono;
        this.estado = estado;
        this.house = house;
        this.rol = rol;
        this.visits = visits;
    }

    // ---------- GETTERS Y SETTERS ---------
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public List<Visit> getVisits() {
        return visits;
    }

    public void setVisits(List<Visit> visits) {
        this.visits = visits;
    }
}
