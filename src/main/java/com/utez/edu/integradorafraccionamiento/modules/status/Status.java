package com.utez.edu.integradorafraccionamiento.modules.status;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.utez.edu.integradorafraccionamiento.modules.employee.Employee;
import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import com.utez.edu.integradorafraccionamiento.modules.visits.Visit;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "estatus")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "status")
    @JsonIgnore
    private List<Visit> visits;

    //1.- Constructor vacío
    public Status() {
    }

    //2.- Constructor con parámetros con atributos de la clase
    public Status(String name) {
        this.name = name;
    }

    //3.- Constructor con parametros de llave y atributos de la clase
    public Status(int id, String name) {
        this.id = id;
        this.name = name;
    }

    //4.- Constructor con relaciones y atributos de la clase
    public Status(String name, List<Visit> visits) {
        this.name = name;
        this.visits = visits;
    }

    //5.- Constructor con todos los atributos de la clase, atributos de relacion y llave de la clase
    public Status(int id, String name, List<Visit> visits) {
        this.id = id;
        this.name = name;
        this.visits = visits;
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

    public List<Visit> getVisits() {
        return visits;
    }

    public void setVisits(List<Visit> visits) {
        this.visits = visits;
    }
}
