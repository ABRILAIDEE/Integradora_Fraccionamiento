import React from 'react';
import qrCode from '../assets/qr-code.png';

const QRScreen = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.logo}>SCSVF</span>
        <div style={styles.rightHeader}>
          <button style={styles.logoutButton}>Cerrar sesión</button>
          <div style={styles.userIcon}>👤</div>
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
    width: '100vw',
    height: '100vh',
    backgroundColor: '#F09560',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  rightHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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
