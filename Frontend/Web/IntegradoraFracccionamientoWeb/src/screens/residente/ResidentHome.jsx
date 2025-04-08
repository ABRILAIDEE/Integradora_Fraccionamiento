import React from "react";
import userIcon from "../../assets/vecindario.png";
import profileIcon from "../../assets/usuario.png"; // tu nuevo icono pequeño

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
  loginBox: {
    marginTop: "60px",
    textAlign: "center",
  },
  icon: {
    marginBottom: "60px",
  },
  iconImg: {
    width: "200px",
    height: "200px",
    marginBottom: "-40px",
    objectFit: "contain",
  },
  titleHome: {
    color: "#000",
  },
  createVisitButton: {
    display: "block",
    margin: "0 auto",
    backgroundColor: "#EBEBF2",
    color: "#000",
    padding: "12px 20px",
    width: "500px",
    height: "40px",
    border: "none",
    borderRadius: "999px",
    fontSize: "20px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  myVisitsButton: {
    display: "block",
    margin: "0 auto",
    backgroundColor: "#EBEBF2",
    color: "#000",
    padding: "12px 20px",
    width: "500px",
    height: "40px",
    border: "none",
    borderRadius: "999px",
    fontSize: "20px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default function ResidentHome() {
  return (
    <div style={styles.container}>
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

      <div style={styles.loginBox}>
        <h1 style={styles.titleHome}>¿Qué vas a hacer hoy?</h1>
        <div style={styles.icon}>
          <img src={userIcon} alt="User Icon" style={styles.iconImg} />
        </div>
        <button style={styles.createVisitButton}>Crear Visitas</button>
        <button style={styles.myVisitsButton}>Mis Visitas</button>
      </div>
    </div>
  );
}
