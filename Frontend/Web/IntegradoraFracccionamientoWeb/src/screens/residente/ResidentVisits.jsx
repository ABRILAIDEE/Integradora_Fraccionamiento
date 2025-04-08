import React from "react";
import editar from "../../assets/editar-usuario.png";
import profileIcon from "../../assets/usuario.png"; // tu nuevo icono pequeño
//import contacto from "../../assets/contacto.png" 
//import { useNavigate } from "react-router-dom";

const guardias = [
    { id: "01", nombre: "Jesus Zohet", correo: "jesus@gmail.com", fecha: "17/02/1987", direccion: "Emiliano Zapata, Colonia ; Amatitlán, Calle ; Chamipla Juárez, 62767", estatus: "Bloqueado" },
    { id: "02", nombre: "Vannessa", correo: "vannessa@gmail.com", fecha: "17/02/1987", direccion: "Emiliano Zapata, Colonia ; Real Tezoyuca ,Calle ; Narciso Mendoza, 62892", estatus: "Activo" },
    { id: "03", nombre: "Juan", correo: "juan@gmail.com", fecha: "17/02/1987", direccion: "Emiliano Zapata, Colonia ; Palomas ,Calle ; Álvaro Obregón , 62768", estatus: "Activo" },
    { id: "04", nombre: "Marcelino", correo: "Marcellino@gmail.com", fecha: "17/02/1987", direccion: "Emiliano Zapata, Colonia ; Lomas, Calle ; Tubas , 62796", estatus: "Activo" },
    { id: "05", nombre: "Mike", correo: "mike@gmail.com", fecha: "17/02/1987", direccion: "Emiliano Zapata, Colonia ; Agustín Alonso, Calle ; Narciso , 62798", estatus: "Bloqueado" },
];

const ResidentVisits = () => {
    const styles = {
        container: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#F09560',
          padding: 20,
          overflow: 'hidden',
          boxSizing: 'border-box'
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
          fontSize: 21,
          fontWeight: 'bold',
          color: '#000'
        },
        profileSection: {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginLeft: 'auto'
        },
        logout: {
          backgroundColor: '#591202',
          borderRadius: 35,
          border: 'none',
          cursor: 'pointer',
          color: '#fff',
          padding: '8px 16px'
        },
        profileIcon: {
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: '#fff',
          transition: '0.3s ease',
          overflow: 'hidden'
        },
        titleContainer: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
          maxWidth: '80%',
          marginTop: -150,
          marginBottom: 50
        },
        subtitle: {
          fontSize: 64,
          fontWeight: 'bold',
          flexGrow: 1,
          textAlign: 'center',
          color: '#000',
          margin: 0
        },
        buttonContainer: {
          position: 'absolute',
          right: 0
        },
        registerButton: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          backgroundColor: '#591202',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: 35,
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: 16,
          boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
          transition: '0.3s ease',
          whiteSpace: 'nowrap'
        },
        buttonIcon: {
          width: 25,
          height: 25
        },
        tableContainer: {
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '80%',
          backgroundColor: '#EBEBF2',
          padding: 0,
          borderRadius: 10,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
        },
        table: {
          width: '100%',
          borderCollapse: 'collapse'
        },
        tableCell: {
          padding: 12,
          border: '1px solid #591202',
          textAlign: 'left',
          color: '#000'
        },
        tableHeader: {
          backgroundColor: '#BF8969',
          color: 'black',
          textAlign: 'center'
        },
        statusActive: {
          color: 'green',
          fontWeight: 'bold'
        },
        statusBlocked: {
          color: 'red',
          fontWeight: 'bold'
        },
        editButton: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          backgroundColor: '#591202',
          color: 'white',
          padding: '5px 10px',
          border: 'none',
          borderRadius: 35,
          cursor: 'pointer'
        }
    };
      
    //const navigate = useNavigate();

    return (
        <div style={styles.container} className="container">
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
        
            <div style={styles.titleContainer} className="title-container">
                <h1 style={styles.subtitle} className="subtitle">Mis Visitas</h1>
            </div>
        
            <div style={styles.tableContainer} className="table-container">
                <table style={styles.table} className="table">
                    <thead>
                        <tr>
                            <th style={{...styles.tableCell, ...styles.tableHeader}}>Id visita</th>
                            <th style={{...styles.tableCell, ...styles.tableHeader}}>Nombre (s)</th>
                            <th style={{...styles.tableCell, ...styles.tableHeader}}>Tipo Visita</th>
                            <th style={{...styles.tableCell, ...styles.tableHeader}}>Fecha / Hora</th>
                            <th style={{...styles.tableCell, ...styles.tableHeader}}>Descripcion</th>
                            <th style={{...styles.tableCell, ...styles.tableHeader}}>Placas</th>
                            <th style={{...styles.tableCell, ...styles.tableHeader}}>Estatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guardias.map((guardia) => (
                            <tr key={guardia.id}>
                                <td style={styles.tableCell}>{guardia.id}</td>
                                <td style={styles.tableCell}>{guardia.nombre}</td>
                                <td style={styles.tableCell}>{guardia.correo}</td>
                                <td style={styles.tableCell}>{guardia.fecha}</td>
                                <td style={styles.tableCell}>{guardia.direccion}</td>
                                <td style={{
                                    ...styles.tableCell,
                                    ...(guardia.estatus === "Activo" ? styles.statusActive : styles.statusBlocked)
                                }} className={guardia.estatus === "Activo" ? "status-active" : "status-blocked"}>
                                    {guardia.estatus}
                                </td>
                                <td style={styles.tableCell}>
                                    <button style={styles.editButton} className="edit-button">
                                        <img style={styles.buttonIcon} src={editar} alt="Profile" className="button-icon" />
                                        👤 Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResidentVisits;