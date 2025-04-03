import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usuario from '../assets/usuario.png';

const CrearVisita = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [numPersonas, setNumPersonas] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoVisita, setTipoVisita] = useState('');
  const [palabraClave, setPalabraClave] = useState('');
  const [numeroCasa, setNumeroCasa] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [estatus, setEstatus] = useState('');
  const [fileIne, setFileIne] = useState(null);
  const [filePlacas, setFilePlacas] = useState(null);

  const handleGoToLogin = () => navigate('/login');
  const handleGoToPerfil = () => navigate('/perfil');

  const handleCompartirEnlace = async () => {
    const url = new URL(window.location.href);
    url.pathname = '/create-visit';

    url.searchParams.set('name', nombre);
    url.searchParams.set('numPersons', numPersonas);
    url.searchParams.set('description', descripcion);
    url.searchParams.set('vehiclePlate', filePlacas?.name || ''); // nombre del archivo
    url.searchParams.set('houseNumber', numeroCasa);
    url.searchParams.set('visitDate', `${fecha} ${hora}`);
    url.searchParams.set('visitStatus', estatus);
    url.searchParams.set('keyword', palabraClave);

    const link = url.toString();

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Invitación de visita', text: 'Comparte este enlace:', url: link });
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(link);
        alert('Enlace copiado:\n' + link);
      } catch (error) {
        console.error('No se pudo copiar el enlace:', error);
      }
    }
  };

  const handleGenerarQR = () => {
    const visitData = {
      name: nombre,
      numPersons: numPersonas,
      description: descripcion,
      vehiclePlate: filePlacas?.name || '',
      houseNumber: numeroCasa,
      visitDate: `${fecha} ${hora}`,
      visitStatus: estatus,
      keyword: palabraClave,
    };

    const encodedData = encodeURIComponent(JSON.stringify(visitData));
    navigate(`/qr?data=${encodedData}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span onClick={handleGoToLogin} style={styles.logo}>SCSVF</span>
        <div style={styles.headerRight}>
          <span onClick={handleGoToLogin} style={styles.logoutButton}>Cerrar sesión</span>
          <img src={usuario} alt="Usuario" style={styles.userIcon} onClick={handleGoToPerfil} />
        </div>
      </div>

      <div style={styles.formContainer}>
        <h1 style={styles.title}>Crear visita</h1>
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Nombre o nombres completos:</label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>
          <div style={styles.inputGroup}>
            <label>Número de personas:</label>
            <input type="number" value={numPersonas} onChange={e => setNumPersonas(e.target.value)} />
          </div>
          <div style={styles.inputGroup}>
            <label>Descripción:</label>
            <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
          </div>
          <div style={styles.inputGroup}>
            <label>Tipo de visitas:</label>
            <input type="text" value={tipoVisita} onChange={e => setTipoVisita(e.target.value)} />
          </div>
          <div style={styles.inputGroup}>
            <label>Placas del vehículo (subir archivo):</label>
            <input type="file" accept="image/*" onChange={e => setFilePlacas(e.target.files[0])} />
          </div>
          <div style={styles.inputGroup}>
            <label>Palabras clave (si es el caso):</label>
            <input type="text" value={palabraClave} onChange={e => setPalabraClave(e.target.value)} />
          </div>
          <div style={styles.inputGroup}>
            <label>INE del trabajador (subir archivo):</label>
            <input type="file" accept="image/*" onChange={e => setFileIne(e.target.files[0])} />
          </div>
          <div style={styles.inputGroup}>
            <label>Número de casa a visitar:</label>
            <input type="text" value={numeroCasa} onChange={e => setNumeroCasa(e.target.value)} />
          </div>
          <div style={styles.inputGroup}>
            <label>Fecha y hora de visita:</label>
            <input type="date" style={styles.smallInput} value={fecha} onChange={e => setFecha(e.target.value)} />
            <input type="time" style={styles.smallInput} value={hora} onChange={e => setHora(e.target.value)} />
          </div>
          <div style={styles.inputGroup}>
            <label>Estatus de visita:</label>
            <input type="text" value={estatus} onChange={e => setEstatus(e.target.value)} />
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button onClick={handleCompartirEnlace} style={styles.button}>Compartir enlace</button>
          <button onClick={handleGenerarQR} style={styles.button}>Generar código QR</button>
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
    height: '400vh',
    position: 'fixed', 
    top: 0,
    left: 0,
  },
  userIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    cursor: 'pointer',
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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 149, 96, 0.9)', 
    padding: '100px',
    borderRadius: '15px',
    height: '650px',
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
