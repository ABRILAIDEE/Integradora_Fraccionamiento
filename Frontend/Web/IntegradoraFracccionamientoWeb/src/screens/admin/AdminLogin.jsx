import React from "react";
import userIcon from "../../assets/usuario.png"; // Asegúrate que la ruta sea correcta

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
    boxSizing: "border-box", // Asegura que el padding no cause desbordamiento
  },
  logo: {
    fontWeight: "bold",
    fontSize: "25px",
    color: "black",
    margin: 0,
  },
  adminButton: {
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
  loginBox: {
    marginTop: "60px",
    textAlign: "center",
  },
  icon: {
    marginBottom: "20px",
  },
  iconImg: {
    width: "200px",
    height: "200px",
    marginBottom: "-10px",
    objectFit: "contain",
  },
  titulo: {
    margin: "15px",
    fontSize: "50px",
    color: "black",
  },
  inputCode: {
    display: "block",
    margin: "0 auto 16px auto",
    padding: "12px 20px",
    borderRadius: "999px",
    width: "460px",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    fontSize: "16px",
    color: "black",
    border: "none",
  },
  submitButton: {
    display: "block",
    margin: "0 auto",
    backgroundColor: "#591202",
    color: "white",
    padding: "12px 20px",
    width: "500px",
    height: "40px",
    border: "none",
    borderRadius: "999px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default function AdminLogin() {
  return (
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.logo}>SCSVF</h1>
          <button style={styles.adminButton}>Soy Residente</button>
        </div>
  
        {/* Content */}
        <div style={styles.loginBox}>
          <div style={styles.icon}>
            <img src={userIcon} alt="User Icon" style={styles.iconImg} />
          </div>
  
          <h1 style={styles.titulo}>SCSVF</h1>
          <input type="text" placeholder="Usuario" style={styles.inputCode} />
          <input type="text" placeholder="Contraseña" style={styles.inputCode} />
          <button style={styles.submitButton}>Ingresar</button>
        </div>
      </div>
    );
}
