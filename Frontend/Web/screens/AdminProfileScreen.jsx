import React, { useState } from "react";
import Header from "../components/Header";
import CustomButton from "../components/Button";
import Modal from "../components/Modal"; // Asegúrate de importar el Modal

const styles = {
  container: {
    backgroundColor: "#F09560",
    height: "120vh",
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
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "300px",
    marginRight: "22px",
  },
  label: {
    color: "black",
    display: "block",
    marginBottom: "5px",
    fontWeight: 700,
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    color: "black",
    marginBottom: 15,
  },
  img: {
    width: 400,
    height: 400,
    marginRight: 35,
    borderRadius: "50%",
  },
  title: {
    color: "black",
    fontWeight: 800,
    marginBottom: "50px",
    fontSize: 90,
  },
  modalText: {
    color: "black"
  },
  modalTitle: {
    color: "black",
    fontWeight: 'bold'
  }
};

function AdminProfileScreen() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    dob: "",
    address: "",
    phone: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={styles.container}>
      <Header buttonText="Cerrar sesión" />
      <h1 style={styles.title}> Tu perfil </h1>
      <div style={styles.content}>
        <img style={styles.img} src="../src/assets/cuenta.png" alt="user" />
        <form style={styles.form}>
          <label style={styles.label}>Nombre Completo</label>
          <input
            type="text"
            readOnly
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
            placeholder="Escribe tu nombre completo"
          />
          <label style={styles.label}>Correo Electrónico</label>
          <input
            type="email"
            readOnly
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="Escribe tu correo electrónico"
          />
          <label style={styles.label}>Edad</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            readOnly
            style={styles.input}
            placeholder="Escribe tu edad"
          />
          <label style={styles.label}>Fecha de Nacimiento</label>
          <input
            type="date"
            readOnly
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            style={styles.input}
          />
          <label style={styles.label}>Dirección</label>
          <input
            type="text"
            readOnly
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={styles.input}
            placeholder="Escribe tu dirección"
          />
          <label style={styles.label}>Teléfono</label>
          <input
            type="tel"
            name="phone"
            readOnly
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            placeholder="Escribe tu teléfono"
          />
          <CustomButton text="Editar perfil" onClick={openModal} />
        </form>
      </div>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Editar Perfil">
        <p style={styles.modalText}>Editar campos</p>
      </Modal>
    </div>
  );
}

export default AdminProfileScreen;
