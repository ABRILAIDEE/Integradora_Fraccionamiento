import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarioIcon from '../assets/usuario.png';

const EditarPerfil = () => {
  const navigate = useNavigate();

  // Estados para cada campo del perfil
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [edad, setEdad] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleEditProfile = () => {
    // Aquí puedes enviar los datos editados al backend
    alert('Perfil editado ✅');
    console.log({
      nombre,
      correo,
      edad,
      fechaNacimiento,
      direccion,
      telefono
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.logo} onClick={handleNavigateToLogin}>SCSVF</span>
        <button onClick={handleNavigateToLogin} style={styles.logoutButton}>Cerrar sesión</button>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>Editar Perfil</h1>

        <div style={styles.profileContainer}>
          <img src={usuarioIcon} alt="Perfil" style={styles.profileImage} />

          <div style={styles.formContainer}>
            <label style={styles.label}>Nombre completo:</label>
            <input style={styles.input} value={nombre} onChange={(e) => setNombre(e.target.value)} />

            <label style={styles.label}>Correo electrónico:</label>
            <input style={styles.input} value={correo} onChange={(e) => setCorreo(e.target.value)} />

            <label style={styles.label}>Edad:</label>
            <input style={styles.input} type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />

            <label style={styles.label}>Fecha de nacimiento:</label>
            <input style={styles.input} type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />

            <label style={styles.label}>Dirección:</label>
            <input style={styles.input} value={direccion} onChange={(e) => setDireccion(e.target.value)} />

            <label style={styles.label}>Teléfono:</label>
            <input style={styles.input} value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>

          <button style={styles.editButton} onClick={handleEditProfile}>Editar Perfil</button>
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
    height: '10vh',
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
    padding: '30px',
    borderRadius: '15px',
    height: '874px',
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
    padding: '18px',
    width: '150px',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px',
  },
};

export default EditarPerfil;
