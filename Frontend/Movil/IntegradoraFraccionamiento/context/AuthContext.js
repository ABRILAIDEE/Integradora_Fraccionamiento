import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [verificationCode, setVerificationCode] = useState(null);

    // Generar código de verificación simulado
    const generateVerificationCode = () => {
        return Math.floor(1000 + Math.random() * 9000).toString(); // Código de 4 dígitos
    };

    // Paso 1: Residente ingresa su número
    const sendVerificationCode = (number) => {
        const formattedNumber = number.trim();
        setPhoneNumber(formattedNumber);

        // Generar código simulado
        const code = generateVerificationCode();
        setVerificationCode(code);
        
        console.log(`Código enviado a ${formattedNumber}: ${code}`); // Simulación
    };

    // Paso 2: Residente verifica el código recibido
    const verifyCode = (codeEntered) => {
        if (codeEntered === verificationCode) {
            setUser({ role: "residente", phoneNumber });
            setPhoneNumber(null);
            setVerificationCode(null);
            return true;
        }
        return false;
    };

    // Login para Guardia
    const loginGuardia = (username, password) => {
        if (username.toLowerCase().trim() === "guardia" && password === "guardia123") {
            setUser({ role: "guardia" });
        }
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{
            user, loginGuardia, logout, sendVerificationCode, verifyCode, phoneNumber
        }}>
            {children}
        </AuthContext.Provider>
    );
};
