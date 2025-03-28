import React, { useState } from 'react';
import Header from '../components/Header';
import CustomButton from '../components/Button';

const styles = {
  container: {
    backgroundColor: '#F09560',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 0,
  },
  title: {
    color: 'black',
    fontWeight: 800,
    marginBottom: '50px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '300px',
  },
  inputContainer: {
    marginBottom: '15px',
    width: '100%',
  },
  label: {
    color: 'white',
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    color: 'black',
  },
  img: {
    width: 250,
    height: 250
  }
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
  };

  return (
    <div style={styles.container}>
      <Header buttonText="Soy residente" />
      <img style={styles.img} src="../src/assets/cuenta.png" alt="user" />
      <h2 style={styles.title}>SCSVF</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="usuario"
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="contraseña"
            style={styles.input}
          />
        </div>
        <CustomButton
          text="Ingresar"
          onClick={handleSubmit}
          style={styles.button}
        />
      </form>
    </div>
  );
}

export default Login;
