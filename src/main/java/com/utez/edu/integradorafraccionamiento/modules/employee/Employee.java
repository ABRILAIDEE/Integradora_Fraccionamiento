package com.utez.edu.integradorafraccionamiento.modules.employee;

import com.utez.edu.integradorafraccionamiento.modules.house.House;
import com.utez.edu.integradorafraccionamiento.modules.rol.Rol;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "employee")
public class Employee {

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

    @Column(name = "telefono", nullable = false, unique = true)
    private String telefono;

    @Column(name = "direccion", nullable = false)
    private String direccion;

    @Column(name = "calle", nullable = false)
    private String calle;

    @Column(name = "contrasena", nullable = false)
    private String contrasena;

    @Column(name = "estado", nullable = false)
    private String estado = "Activo";

    @ManyToOne
    @JoinColumn(name = "id_rol", nullable = false)
    private Rol rol;

    //---------------- CONSTRUCTORES ----------------
    //1.- Constructor vacío
    public Employee() {
    }

    //2.- Constructor con parámetros con atributos de la clase
    public Employee(String nombre, String apellidos, int edad, LocalDate fechaNacimiento, String email, String telefono, String direccion, String calle, String contrasena, String estado) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.calle = calle;
        this.contrasena = contrasena;
        this.estado = estado;
    }

    //3.- Constructor con parametros de llave y atributos de la clase
    public Employee(long id, String nombre, String apellidos, int edad, LocalDate fechaNacimiento, String email, String telefono, String direccion, String calle, String contrasena, String estado) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.calle = calle;
        this.contrasena = contrasena;
        this.estado = estado;
    }

    //4.- Constructor con relaciones y atributos de la clase
    public Employee(Rol rol, String estado, String contrasena, String calle, String direccion, String telefono, String email, LocalDate fechaNacimiento, int edad, String apellidos, String nombre) {
        this.rol = rol;
        this.estado = estado;
        this.contrasena = contrasena;
        this.calle = calle;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.edad = edad;
        this.apellidos = apellidos;
        this.nombre = nombre;
    }

    //5.- Constructor con todos los atributos de la clase, atributos de relacion y llave de la clase
    public Employee(long id, String nombre, String apellidos, int edad, LocalDate fechaNacimiento, String email, String telefono, String direccion, String calle, String contrasena, String estado, Rol rol) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.calle = calle;
        this.contrasena = contrasena;
        this.estado = estado;
        this.rol = rol;
    }

    //--------------- GETTERS Y SETTERS ----------------
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

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }
}
