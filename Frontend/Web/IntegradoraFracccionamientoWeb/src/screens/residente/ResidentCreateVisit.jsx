import { useState } from "react";
import profileIcon from "../../assets/usuario.png";
import cameraIcon from "../../assets/subir.png"; // Necesitarás una imagen de cámara

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: '#F09560',
    boxSizing: 'border-box',
    padding: '70px 0 20px 0',
    position: 'relative',
  },
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "60px",
    width: "100%",
    backgroundColor: "#f2f2f2",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    zIndex: 10,
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
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '50px',
    fontWeight: 'bold',
    color: '#000',
    margin: '0',
    marginTop: "60px"
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    maxWidth: '1200px',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#000',
  },
  input: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    fontSize: '16px',
  },
  dateTimeContainer: {
    display: 'flex',
    gap: '15px',
  },
  dateInput: {
    width: '120px',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    fontSize: '16px',
  },
  timeInput: {
    width: '100px',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    fontSize: '16px',
  },
  imageUploadContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  imageInput: {
    flex: 1,
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px 0 0 5px',
    backgroundColor: '#FFFFFF',
    fontSize: '16px',
  },
  cameraButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '42px',
    height: '42px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #ccc',
    borderLeft: 'none',
    borderRadius: '0 5px 5px 0',
    cursor: 'pointer',
  },
  cameraIcon: {
    width: '25px',
    height: '25px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: '30px',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#591202',
    color: 'white',
    padding: '15px',
    border: 'none',
    borderRadius: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default function ResidentCreateVisit() {
  const [form, setForm] = useState({
    nombre: "",
    numeroPersonas: "",
    descripcion: "",
    tipoVisita: "",
    placasVehiculo: "",
    palabrasClave: "",
    ineImagen: "",
    numeroCasa: "",
    fecha: "",
    hora: "",
    estatus: "Pendiente",
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
          <div style={styles.profileIcon}>
            <img src={profileIcon} alt="Perfil" style={styles.profileIconImage} />
          </div>
        </div>
      </div>
      
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>Crear visita</h1>
      </div>

      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre o nombres completos:</label>
            <input 
              type="text" 
              name="nombre" 
              placeholder="Juan Pérez" 
              value={form.nombre} 
              onChange={handleChange} 
              style={styles.input} 
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Numero de personas:</label>
            <input 
              type="number" 
              name="numeroPersonas" 
              placeholder="5" 
              value={form.numeroPersonas} 
              onChange={handleChange} 
              style={styles.input} 
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Descripción:</label>
            <input 
              type="text" 
              name="descripcion" 
              placeholder="Vamos con el fin de saludar a una amiga" 
              value={form.descripcion} 
              onChange={handleChange} 
              style={styles.input} 
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Tipo de visitas:</label>
            <input 
              type="text" 
              name="tipoVisita" 
              placeholder="Tecnica / Familiar" 
              value={form.tipoVisita} 
              onChange={handleChange} 
              style={styles.input} 
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Placas del vehículo (si es el caso):</label>
            <input 
              type="text" 
              name="placasVehiculo" 
              placeholder="OSK-128-9FKL" 
              value={form.placasVehiculo} 
              onChange={handleChange} 
              style={styles.input} 
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Palabras clave (si es el caso):</label>
            <input 
              type="text" 
              name="palabrasClave" 
              placeholder="Platano" 
              value={form.palabrasClave} 
              onChange={handleChange} 
              style={styles.input} 
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>INE del trabajador (Si es el caso):</label>
            <div style={styles.imageUploadContainer}>
              <input 
                type="text" 
                name="ineImagen" 
                placeholder="foto de INE" 
                value={form.ineImagen} 
                onChange={handleChange} 
                style={styles.imageInput} 
              />
              <div style={styles.cameraButton}>
                <img src={cameraIcon || "https://via.placeholder.com/25"} alt="Cámara" style={styles.cameraIcon} />
              </div>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Numero de casa a visitar:</label>
            <input 
              type="text" 
              name="numeroCasa" 
              placeholder="01" 
              value={form.numeroCasa} 
              onChange={handleChange} 
              style={styles.input} 
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Fecha y hora de visita</label>
            <div style={styles.dateTimeContainer}>
              <input 
                type="text" 
                name="fecha" 
                placeholder="07/12/10" 
                value={form.fecha} 
                onChange={handleChange} 
                style={styles.dateInput} 
              />
              <input 
                type="text" 
                name="hora" 
                placeholder="00:00" 
                value={form.hora} 
                onChange={handleChange} 
                style={styles.timeInput} 
              />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Estatus de visita</label>
            <input 
              type="text" 
              name="estatus" 
              placeholder="Pendiente" 
              value={form.estatus} 
              onChange={handleChange} 
              style={styles.input} 
              readOnly
            />
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button type="button" style={styles.actionButton}>
            Compartir enlace
          </button>
          <button type="button" style={styles.actionButton}>
            Generar codigo QR
          </button>
        </div>
      </form>
    </div>
  );
}