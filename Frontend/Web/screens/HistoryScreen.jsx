import React from "react";
import Header from "../components/Header"; // Incluí el Header para modularidad.

const styles = {
  container: {
    backgroundColor: "#F09560",
    height: "105vh",
    width: "99vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: 0,
  },
  table: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    color: "black", 
  },
  tableCell: {
    color: "black",
    padding: "10px",
  },
  title: {
    color: "black",
    fontWeight: 800,
    marginBottom: "30px",
    fontSize: 40,
  },
  button: {
    backgroundColor: "#591202",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  // Nuevo estilo para el encabezado de la tabla
  tableHeader: {
    backgroundColor: "#BF8969",
    color: "black", // Color de texto del encabezado
    padding: "10px",
    fontWeight: "bold",
  },
};

const HistoryScreen = () => {
  const data = [
    {
      idVisita: 1,
      nombre: "Juan Pérez",
      usuario: "jperez",
      placas: "ABC123",
      telefono: "555-1234",
      direccion: "Calle 123",
      status: "Activo",
    },
    {
      idVisita: 2,
      nombre: "Ana López",
      usuario: "alopez",
      placas: "XYZ456",
      telefono: "555-5678",
      direccion: "Avenida 456",
      status: "Inactivo",
    },
  ];

  return (
    <div style={styles.container}>
      <Header buttonText="Cerrar sesión" />
      <h1 style={styles.title}>Historial de visitas</h1>
      <table style={styles.table}>
      <thead>
  <tr>
    <th style={styles.tableHeader}>ID Visita</th>
    <th style={styles.tableHeader}>Nombre</th>
    <th style={styles.tableHeader}>Usuario</th>
    <th style={styles.tableHeader}>Placas</th>
    <th style={styles.tableHeader}>Teléfono</th>
    <th style={styles.tableHeader}>Dirección</th>
    <th style={styles.tableHeader}>Estatus</th>
    <th style={styles.tableHeader}>Acción</th>
  </tr>
</thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.idVisita}>
              <td>{item.idVisita}</td>
              <td>{item.nombre}</td>
              <td>{item.usuario}</td>
              <td>{item.placas}</td>
              <td>{item.telefono}</td>
              <td>{item.direccion}</td>
              <td>{item.status}</td>
              <td>
                <button
                  style={styles.button}
                  onClick={() => alert(`Acción para ${item.nombre}`)}
                >
                  Acción
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryScreen;