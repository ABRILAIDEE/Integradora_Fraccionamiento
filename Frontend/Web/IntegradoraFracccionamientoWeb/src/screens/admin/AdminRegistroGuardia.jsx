import React, { useState } from "react";
import usuario from "../../assets/usuario.png";
import profileIcon from "../../assets/usuario.png"; // tu nuevo icono pequeño

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#F09560',
    boxSizing: 'border-box',
  },
  logout: {
    backgroundColor: '#591202',
    borderRadius: 35,
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    padding: '8px 16px'
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
  title: {
    fontSize: '21px',
    fontWeight: 'bold',
    color: '#000',
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    maxWidth: '80%',
    marginTop: '-10px',
    marginBottom: '30px',
  },
  subtitle: {
    fontSize: '64px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    position: 'relative',
    marginTop: "-40px"
  },
  profileIcon: {
    backgroundColor: '#f0f0f0',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto 0',
    marginLeft: '-300px',
    overflow: 'hidden', // Asegura que la imagen no se desborde
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Mantiene la imagen dentro del círculo
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '15px',
  },
  formGroup: {
    textAlign: 'left',
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
    color: '#000',
  },
  inputField: {
    width: '250%',
    height: '20px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    color: '#000',
    backgroundColor: '#EBEBF2',
    fontSize: '16px',
  },
  submitButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  submitButton: {
    backgroundColor: '#591202',
    color: 'white',
    padding: '10px',
    border: 'none',
    height: '5%',
    width: '200%',
    borderRadius: '30px',
    fontSize: '20px',
    cursor: 'pointer',
    marginTop: '15px',
    marginLeft: '-200px',
    alignSelf: 'center',
  },
  submitButtonHover: {
    backgroundColor: '#3d1f0e',
  },
};

export default function AdminRegistroGuardia() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    edad: "",
    fechaNacimiento: "",
    direccion: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", form);
  };

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
      
      <div style={styles.titleContainer}>
        <h1 style={styles.subtitle}>Registro de guardia</h1>
      </div>

      <div style={styles.formContainer}>
        <div style={styles.profileIcon}>
          <img src={usuario} alt="Profile" style={styles.profileImage} />
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre completo:</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ingresa el nombre"
              value={form.nombre}
              onChange={handleChange}
              style={styles.inputField}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Correo electrónico:</label>
            <input
              type="email"
              name="correo"
              placeholder="Ingresa el correo"
              value={form.correo}
              onChange={handleChange}
              style={styles.inputField}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Edad:</label>
            <input
              type="number"
              name="edad"
              placeholder="Ingresa la edad"
              value={form.edad}
              onChange={handleChange}
              style={styles.inputField}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Fecha de nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              placeholder="Ingresa la fecha de nacimiento"
              value={form.fechaNacimiento}
              onChange={handleChange}
              style={styles.inputField}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Dirección:</label>
            <input
              type="text"
              name="direccion"
              placeholder="Ingresa la dirección"
              value={form.direccion}
              onChange={handleChange}
              style={styles.inputField}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Teléfono:</label>
            <input
              type="tel"
              name="telefono"
              placeholder="Ingresa el teléfono"
              value={form.telefono}
              onChange={handleChange}
              style={styles.inputField}
            />
          </div>
          <div style={styles.submitButtonContainer}>
            <button type="submit" style={styles.submitButton}>
              Registrar guardia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
