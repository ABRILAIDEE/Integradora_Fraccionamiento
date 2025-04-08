import React, { useState } from "react";
import edit from "../../assets/editar-negro.png"; // Importando el icono
import profileIcon from "../../assets/usuario.png"; // Importando el icono


const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#F09560",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    fontFamily: "sans-serif",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "70px",
    width: "100%",
    backgroundColor: "#f2f2f2",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box", // Asegúrate de que el padding no cause desbordamiento
  },
  logo: {
    fontWeight: "bold",
    fontSize: "25px",
    color: "black",
    margin: 0,
  },
  logoutButton: {
    backgroundColor: "#4A1004",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "bold",
    height: "40px",
    cursor: "pointer",
  },
  logoutContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoutIcon: {
    width: "36px",
    height: "36px",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  logoutIconHover: {
    transform: "scale(1.1)",
  },
  content: {
    marginTop: "60px",
    textAlign: "center",
    width: "100%",
    maxWidth: "500px",
  },
  title: {
    margin: " auto 0",
    fontSize: "64px",
    color: "black",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    marginLeft: "-100px"
  },
  iconContainer: {
    margin: "20px auto",
    width: "120px",
    height: "120px",
  },
  iconImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  statusLabel: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: "18px",
    marginBottom: "8px",
    color: "#000000"
  },
  inputStatus: {
    display: "block",
    margin: "0 auto 16px auto",
    padding: "12px 20px",
    borderRadius: "8px",
    width: "100%",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    fontSize: "16px",
    color: "black",
    border: "none",
    boxSizing: "border-box",
  },
  editButton: {
    display: "block",
    margin: "20px auto 0 auto",
    backgroundColor: "#591202",
    color: "white",
    padding: "12px 20px",
    width: "100%",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default function AdminEditarEstatusVisita() {
  const [estatus, setEstatus] = useState("Pendiente");

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
                          <h1 style={styles.logo}>SCSVF</h1>
                          <div style={styles.logoutContainer}>
                            <button style={styles.logoutButton}>Cerrar sesión</button>
                            <img
                              src={profileIcon}
                              alt="Perfil"
                              style={styles.logoutIcon}
                            />
                          </div>
                        </div>

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Editar estatus de visita</h1>
        
        <div style={styles.iconContainer}>
          <img src={edit} alt="Editar Icono" style={styles.iconImg} />
        </div>
        
        <div style={styles.statusLabel}>Estatus:</div>
        <input 
          type="text"
          value={estatus}
          onChange={(e) => setEstatus(e.target.value)}
          style={styles.inputStatus}
        />
        
        <button style={styles.editButton}>
          Editar estatus
        </button>
      </div>
    </div>
  );
}