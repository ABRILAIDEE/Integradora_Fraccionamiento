package com.utez.edu.integradorafraccionamiento.modules.rol;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.utez.edu.integradorafraccionamiento.modules.employee.Employee;
import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "rol")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "rol")
    @JsonIgnore
    private List<Resident> residents;

    @OneToMany(mappedBy = "rol")
    @JsonIgnore
    private List<Employee> employees;

    //1.- Constructor vacío
    public Rol() {
    }

    //2.- Constructor con parámetros con atributos de la clase
    public Rol(String name) {
        this.name = name;
    }

    //3.- Constructor con parametros de llave y atributos de la clase
    public Rol(int id, String name) {
        this.id = id;
        this.name = name;
    }

    //4.- Constructor con relaciones y atributos de la clase
    public Rol(String name, List<Resident> residents, List<Employee> employees) {
        this.name = name;
        this.residents = residents;
        this.employees = employees;
    }

    //5.- Constructor con todos los atributos de la clase, atributos de relacion y llave de la clase
    public Rol(int id, String name, List<Resident> residents, List<Employee> employees) {
        this.id = id;
        this.name = name;
        this.residents = residents;
        this.employees = employees;
    }

    // GETTERS Y SETTERS
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Resident> getResidents() {
        return residents;
    }

    public void setResidents(List<Resident> residents) {
        this.residents = residents;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }
}
