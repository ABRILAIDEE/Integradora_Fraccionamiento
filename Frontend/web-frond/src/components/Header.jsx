import React from "react";

const Header = ({ buttonText = "Botón" }) => {
  const styles = {
    header: {
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#f4f4f4",
      borderBottom: "1px solid #ccc",
      zIndex: 1000,
      boxSizing: "border-box",
    },
    clickableText: {
      fontSize: "24px",
      fontWeight: 800,
      color: "#333",
      cursor: "pointer",
    },
    button: {
      backgroundColor: "#591202",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <header style={styles.header}>
      <span style={styles.clickableText}>
        SCSVF
      </span>

      <button style={styles.button}>
        {buttonText}
      </button>
    </header>
  );
};

export default Header;