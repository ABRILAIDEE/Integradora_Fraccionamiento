import React from 'react';
import qrCode from '../assets/qr-code.png';

import { useNavigate } from 'react-router-dom';
import usuario from '../assets/usuario.png';
const QRScreen = () => {
  const navigate = useNavigate();

  const handleGoToPerfil = () => {
    navigate('/perfil'); // Redirige a PerfilScreen
  };
  
  const handleGoToLogin = () => {
    navigate('/login'); // Redirige a LoginScreen
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.logo}>SCSVF</span>
         <div style={styles.headerRight}>
            <span onClick={handleGoToLogin} style={styles.logoutButton}>Cerrar sesión</span>
            {/* Redirige a PerfilScreen */}
            <img 
              src={usuario} 
              alt="Usuario" 
              style={styles.userIcon} 
              onClick={handleGoToPerfil} // Evento para redirigir
            />
         </div>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>QR de la visita</h1>
        <img src={qrCode} alt="QR" style={styles.qrImage} />
        <button style={styles.shareButton}>Compartir QR</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '99vw',
    height: '97vh',
    backgroundColor: '#F09560',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#EBEBF2',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2, 
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  
  logoutButton: {
    backgroundColor: '#591202',
    color: '#FFFFFF',
    borderRadius: '20px',
    padding: '8px 16px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  userIcon: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    cursor: 'pointer',
  },
  content: {
    width: '90%',
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#000',
  },
  qrImage: {
    width: '200px',
    height: '200px',
    marginBottom: '20px',
  },
  shareButton: {
    backgroundColor: '#ffffff',
    color: '#000',
    padding: '12px',
    width: '200px',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '20px',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)'
  }
};

export default QRScreen;
