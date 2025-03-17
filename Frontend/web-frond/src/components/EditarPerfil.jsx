import React from 'react';
import usuarioIcon from '../assets/usuario.png';

const EditarPerfil = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.logo}>SCSVF</span>
        <button style={styles.logoutButton}>Cerrar sesión</button>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>Editar Perfil</h1>

        <div style={styles.profileContainer}>
          <img src={usuarioIcon} alt="Perfil" style={styles.profileImage} />

          <div style={styles.formContainer}>
            <label style={styles.label}>Nombre completo:</label>
            <input style={styles.input} value="Juan Pérez" readOnly />

            <label style={styles.label}>Correo electrónico:</label>
            <input style={styles.input} value="juanperez@gmail.com" readOnly />

            <label style={styles.label}>Edad:</label>
            <input style={styles.input} value="34" readOnly />

            <label style={styles.label}>Fecha de nacimiento:</label>
            <input style={styles.input} value="13/05/1987" readOnly />

            <label style={styles.label}>Dirección:</label>
            <input style={styles.input} value="Av. Colima No.35 Calle Lluvia" readOnly />

            <label style={styles.label}>Teléfono:</label>
            <input style={styles.input} value="777 123 1233" readOnly />
          </div>

         
          
          <button style={styles.editButton}>Editar Perfil</button>
        </div>
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
    backgroundAttachment: 'center', 
    width: '100vw',
    height: '130vh',
    position: 'center', 
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
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '20px',
  },
  profileContainer: {
    backgroundColor: '#FFB07D',
    borderRadius: '15px',
    padding: '30px',
    width: '100%',
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    marginBottom: '20px',
  },
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    marginBottom: '15px',
    fontSize: '16px',
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    gap: '20px',
  },
  closeButton: {
    backgroundColor: '#591202',
    color: '#FFFFFF',
    padding: '12px',
    width: '150px',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  editButton: {
    backgroundColor: '#591202',
    color: '#FFFFFF',
    padding: '12px',
    width: '150px',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px', // Espacio entre botones
  },
};

export default EditarPerfil;
