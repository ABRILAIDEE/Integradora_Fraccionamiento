import React from 'react';

const HomeScreen = () => {
  return (
    <div style={styles.container}>
      {/* Encabezado */}
      <div style={styles.header}>
        <span style={styles.logo}>SCSVF</span>
        <button style={styles.logoutButton}>Cerrar sesión</button>
      </div>
      
      {/* Contenido principal */}
      <div style={styles.content}>
        <h1 style={styles.title}>¿Qué vas a hacer hoy?</h1>
        <div style={styles.iconContainer}>
          <span style={styles.icon}>📍</span>
        </div>
        <button style={styles.button}>Crear visitas</button>
        <button style={styles.button}>Mis visitas</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url('/background.jpg')`, 
    backgroundSize: 'to', 
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat', 
    backgroundAttachment: 'fixed', 
    width: '100vw',
    height: '500vh',
    position: 'fixed', 
    top: 0,
    left: 0,
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
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#591202',
    color: '#EBEBF2',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 149, 96, 0.9)', 
    padding: '160px',
    borderRadius: '15px',
    height: '670px',
  },
  iconContainer: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#EBEBF2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    overflow: 'hidden',
  },
  icon: {
    fontSize: '60px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '20px',
  },
  button: {
    padding: '10px',
    width: '300px',
    backgroundColor: '#591202',
    color: '#EBEBF2',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '10px',
  },
};

export default HomeScreen;
