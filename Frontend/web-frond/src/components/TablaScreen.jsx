import React from 'react';
import usuarioIcon from '../assets/usuario.png';

const TablaScreen = () => {
  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <span style={styles.logo}>SCSVF</span>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <button style={styles.logoutButton}>Cerrar sesión</button>
          <img src={usuarioIcon} alt="Usuario" style={styles.userIcon}/>
        </div>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>Mis visitas</h1>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Id visita</th>
              <th style={styles.th}>Nombre(s)</th>
              <th style={styles.th}>Usuario</th>
              <th style={styles.th}>Placas</th>
              <th style={styles.th}>Teléfono</th>
              <th style={styles.th}>Dirección</th>
              <th style={styles.th}>Estatus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>01</td>
              <td style={styles.td}>Jesus Zohet</td>
              <td style={styles.td}>#22</td>
              <td style={styles.td}>385 52 19</td>
              <td style={styles.td}>777 385 52 19</td>
              <td style={styles.td}>Emiliano Zapata, Colonia; Amatitlán, Calle; Chamilpa Juárez, 62767</td>
              <td style={styles.td}>Terminada</td>
            </tr>
            {/* Agrega más filas según necesites */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#F09560',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  header: {
    width:'100%',
    backgroundColor: '#EBEBF2',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '22px',
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
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #000'
  },
  content: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '80px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#000',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#C27B4E',
    padding: '10px',
    color:'#000',
    border: '1px solid #733',
  },
  td: {
    padding: '10px',
    textAlign: 'center',
    border: '1px solid #733',
  },
};

export default TablaScreen;