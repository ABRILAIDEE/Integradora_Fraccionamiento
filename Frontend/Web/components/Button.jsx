// CustomButton.js
import React from 'react';
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
  button: {
    padding: '10px',
    width: '130%',
    backgroundColor: '#591202',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  img: {
    width: 250,
    height: 250
  }
};
const CustomButton = ({ text, onClick }) => {
  return (
    <button type="button" onClick={onClick} style={styles.button}>
      {text}
    </button>
  );
};

export default CustomButton;
