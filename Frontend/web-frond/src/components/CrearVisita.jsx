import React from 'react';

const CrearVisita = () => {
  return (
    <div style={styles.container}>
      {/* Encabezado */}
      <div style={styles.header}>
        <span style={styles.logo}>SCSVF</span>
        <button style={styles.logoutButton}>Cerrar sesión</button>
      </div>
      
      {/* Formulario */}
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Crear visita</h1>
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Nombre o nombres completos:</label>
            <input type="text" value="Juan Pérez" />
          </div>
          <div style={styles.inputGroup}>
            <label>Número de personas:</label>
            <input type="number" value="5" />
          </div>
          <div style={styles.inputGroup}>
            <label>Descripción:</label>
            <input type="text" value="Vamos con el fin de saludar a una amiga" />
          </div>
          <div style={styles.inputGroup}>
            <label>Tipo de visitas:</label>
            <input type="text" value="Técnica / Familiar" />
          </div>
          <div style={styles.inputGroup}>
            <label>Placas del vehículo (si es el caso):</label>
            <input type="text" value="OSK-128-9FKL" />
          </div>
          <div style={styles.inputGroup}>
            <label>Palabras clave (si es el caso):</label>
            <input type="text" value="Plátano" />
          </div>
          <div style={styles.inputGroup}>
            <label>INE del trabajador (Si es el caso):</label>
            <input type="text" value="foto de INE" />
          </div>
          <div style={styles.inputGroup}>
            <label>Número de casa a visitar:</label>
            <input type="text" value="01" />
          </div>
          <div style={styles.inputGroup}>
            <label>Fecha y hora de visita:</label>
            <input type="text" value="07/12/10" style={styles.smallInput} />
            <input type="text" value="00:00" style={styles.smallInput} />
          </div>
          <div style={styles.inputGroup}>
            <label>Estatus de visita:</label>
            <input type="text" value="Pendiente" />
          </div>
        </div>
        
        {/* Botones */}
        <div style={styles.buttonContainer}>
          <button style={styles.button}>Compartir enlace</button>
          <button style={styles.button}>Generar código QR</button>
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
      color: '#fff',
      padding: '10px 18px',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
      transition: 'background 0.3s',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'rgba(240, 149, 96, 0.9)', 
      padding: '160px',
      borderRadius: '15px',
      height: '670px',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#000',
      marginBottom: '20px',
      textAlign: 'center',
    },
    form: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      width: '100%',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontSize: '16px',
      width: '100%',
    },
    smallInput: {
      width: '80px',
      marginRight: '10px',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    checkboxLabel: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#000',
    },
    checkbox: {
      width: '20px',
      height: '20px',
      border: '2px solid #000',
      borderRadius: '4px',
      appearance: 'none',
      cursor: 'pointer',
      backgroundColor: '#fff',
      transition: '0.2s ease-in-out',
    },
    checkboxChecked: {
      backgroundColor: '#591202',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '20px',
    },
    button: {
      padding: '12px 20px',
      backgroundColor: '#591202',
      color: '#fff',
      borderRadius: '25px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
      transition: 'background 0.3s',
    },
    buttonHover: {
      backgroundColor: '#451000',
    },
  };
  
export default CrearVisita;
