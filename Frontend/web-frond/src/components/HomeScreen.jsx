import React from 'react';
import { useNavigate } from 'react-router-dom';
import usuarioICONO from '../assets/usuarioICONO.png'; // Importar la imagen
import usuario from '../assets/usuario.png';

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleCrearVisita = () => {
    navigate('/crear-visita');
  };

  const handleMisVisitas = () => {
    navigate('/tabla');
  };
  
  const handleGoToLogin = () => {
    navigate('/login'); // Redirige a LoginScreen
  };
  const handleGoToPerfil = () => {
    navigate('/perfil'); // Redirige a PerfilScreen
  };
  

  return (
    <div style={styles.container}>
        {/* Encabezado */}
        <div style={styles.header}>
          <span onClick={handleGoToLogin} style={styles.logo}>SCSVF</span>
          <div style={styles.headerRight}>
            <span onClick={handleGoToLogin} style={styles.logoutButton}>Cerrar sesión</span>
            {/* Icono al lado derecho */}
            <img 
              src={usuario} 
              alt="Usuario" 
              style={styles.userIcon} 
              onClick={handleGoToPerfil} // Redirige a PerfilScreen
            />
          </div>
        </div>
      
        {/* Contenido principal */}
        <div style={styles.content}>
          <h1 style={styles.title}>¿Qué vas a hacer hoy?</h1>
          <div style={styles.iconContainer}>
            {/* Reemplazar icono con imagen */}
            <img src={usuarioICONO} alt="Usuario Icono" style={styles.iconImage} />
          </div>
          {/* Conexión de botones */}
          <button onClick={handleCrearVisita} style={styles.button}>Crear visitas</button>
          <button onClick={handleMisVisitas} style={styles.button}>Mis visitas</button>
        </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url('/background.jpg')`, 
    backgroundSize: 'cover', 
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
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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
  userIcon: {
    width: '40px', // Tamaño del icono
    height: '40px',
    borderRadius: '50%', // Icono redondo
    objectFit: 'cover',
    cursor: 'pointer',
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
  iconImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
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
