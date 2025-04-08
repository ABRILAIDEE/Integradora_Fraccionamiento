import React from "react";
import profileIcon from "../../assets/usuario.png";

// Normalmente usarías una librería como qrcode.react para generar QRs dinámicamente
// import { QRCodeSVG } from 'qrcode.react';
// Para este ejemplo usaremos una imagen estática
import qrCodeImage from "../../assets/qr.png"; // Necesitarás una imagen de código QR

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#F09560',
    padding: 20,
    overflow: 'hidden',
    boxSizing: 'border-box'
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: '10px 20px',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    boxSizing: 'border-box'
  },
  logo: {
    fontWeight: "bold",
    fontSize: "25px",
    color: "black",
    margin: 0,
  },
  logoutButton: {
    backgroundColor: "#591202",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  logoutContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  profileIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileIconImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  titleContainer: {
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
    marginTop: '100px',
    marginBottom: '50px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#000',
    margin: '0',
    marginTop: "-80px"
  },
  qrContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '350px',
    height: '350px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '40px',
    marginTop: "-40px"
  },
  qrImage: {
    width: '100%',
    height: '100%',
  },
  shareButton: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '350px',
    textAlign: 'center',
  }
};

export default function ResidentQR() {
  const handleShareQR = () => {
    // Aquí iría la lógica para compartir el código QR
    console.log("Compartir QR");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.logo}>SCSVF</h1>
        <div style={styles.logoutContainer}>
          <button style={styles.logoutButton}>Cerrar sesión</button>
          <div style={styles.profileIcon}>
            <img src={profileIcon} alt="Perfil" style={styles.profileIconImage} />
          </div>
        </div>
      </div>
      
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>QR de la visita</h1>
      </div>

      <div style={styles.qrContainer}>
        <img 
          src={qrCodeImage || "/api/placeholder/300/300"} 
          alt="Código QR de la visita" 
          style={styles.qrImage} 
        />
      </div>

      <button 
        onClick={handleShareQR} 
        style={styles.shareButton}
      >
        Compartir QR
      </button>
    </div>
  );
}