import { useState } from "react";
import usuario from "../../assets/usuario.png";
import profileIcon from "../../assets/usuario.png"; // tu nuevo icono pequeño

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#F09560',
    overflow: 'hidden',
    boxSizing: 'border-box',
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
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    maxWidth: '80%',
    margin: '30px auto',
    marginTop: '-10px',
  },
  subtitle: {
    fontSize: '64px',
    fontWeight: 'bold',
    flexGrow: '1',
    textAlign: 'center',
    color: '#000',
    margin: '0',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px', /* Espaciado entre los botones */
    position: 'absolute',
    right: 0,
  },
  bloquearButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginLeft: '-490px',
  },
  desbloquearButton: {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    position: 'relative',
  },
  profileIcon: {
    fontSize: '100px',
    backgroundColor: '#f0f0f0',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-60px',
    flexShrink: 0,
    overflow: 'hidden',  // Asegura que la imagen no se desborde
  },
  profileIconImage: {
    width: '100%',  // Ocupa todo el contenedor
    height: '100%', // Mantiene la proporción del contenedor
    objectFit: 'cover', // Asegura que la imagen no se distorsione y se recorte si es necesario
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '15px',
  },
  formGroup: {
    textAlign: 'left',
  },
  label: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
    color: '#000',
  },
  input: {
    width: '180%',
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
    marginTop: '20px', /* Espacio entre el último input y el botón */
  },
  editButton: {
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
  editButtonHover: {
    backgroundColor: '#3d1f0e',
  },
};

export default function AdminEditarGuardia() {
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
            <h1 style={styles.subtitle}>Editar guardia</h1>
            <div style={styles.buttonContainer}>
                <button style={styles.bloquearButton}>Bloquear</button>
                <button style={styles.desbloquearButton}>Desbloquear</button>
            </div>
        </div>

        <div style={styles.formContainer}>
        <div style={styles.profileIcon}>
          <img src={usuario} alt="Profile" style={styles.profileIconImage} />
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre completo:</label>
            <input type="text" name="nombre" placeholder="Ingresa la nombre" value={form.nombre} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Correo electrónico:</label>
            <input type="email" name="correo" placeholder="Ingresa la correo" value={form.correo} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Edad:</label>
            <input type="number" name="edad" placeholder="Ingresa la edad" value={form.edad} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Fecha de nacimiento:</label>
            <input type="date" name="fechaNacimiento" placeholder="Ingresa la fecha de nacimiento" value={form.fechaNacimiento} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Dirección:</label>
            <input type="text" name="direccion" placeholder="Ingresa la direccion" value={form.direccion} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Teléfono:</label>
            <input type="tel" name="telefono" placeholder="Ingresa el telefono" value={form.telefono} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.submitButtonContainer}>
            <button type="submit" style={styles.editButton}>
              Editar informacion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
