import React from "react";
import Header from "../components/Header";

const styles = {
  container: {
    backgroundColor: "#F09560",
    height: "105vh",
    width: "99vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: 0,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "800px",
  },
  title: {
    color: "black",
    fontWeight: 800,
    marginBottom: "50px",
    fontSize: 60,
  },
  button: {
    backgroundColor: 'white',
    color: "black",
    width: 300,
  }
};

function AdminHomeScreen() {
  const items = ["Gestión de guardias", "Gestión de residentes",
    "Gestión de casas",
    "Gestión de visitas"
];
  return (
    <div style={styles.container}>
      <Header zbuttonText="Cerrar sesión" />
      <h1 style={styles.title}> ¿Qué vas a hacer hoy? </h1>
      <div style={styles.content}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {items.map((item, index) => (
            <li key={index} style={{ margin: "5px 0" }}>
              <button style={styles.button} onClick={() => handleClick(item)}>{item}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminHomeScreen;
