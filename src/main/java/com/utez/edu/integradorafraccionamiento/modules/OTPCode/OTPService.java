package com.utez.edu.integradorafraccionamiento.modules.OTPCode;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@Transactional
public class OTPService {

    // Estructura para almacenar OTP y la fecha de caducidad
    private final Map<String, OTPDetails> otpStorage = new HashMap<>();

    // Configuración de Twilio (puedes colocar tus credenciales en application.properties)
    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String fromPhoneNumber;

    // Constructor vacío
    public OTPService() {
        // No inicializar Twilio aquí
    }

    @PostConstruct
    public void init() {
        // Inicializar Twilio después de que Spring haya inyectado los valores
        Twilio.init(accountSid, authToken);
    }

    // Método para generar un OTP de 6 dígitos
    public String generateOTP() {
        Random random = new Random();
        int otp = random.nextInt(999999 - 100000) + 100000; // 6 digit OTP
        return String.valueOf(otp);
    }

    // Método para guardar el OTP en un "almacen" temporal con fecha de caducidad (5 minutos)
    public void saveOTP(String phoneNumber, String otp) {
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(5); // OTP caduca en 5 minutos
        otpStorage.put(phoneNumber, new OTPDetails(otp, expiryTime));
    }

    // Método para obtener el OTP guardado, considerando la caducidad
    public String getOTP(String phoneNumber) {
        OTPDetails otpDetails = otpStorage.get(phoneNumber);

        if (otpDetails != null && LocalDateTime.now().isBefore(otpDetails.getExpiryTime())) {
            return otpDetails.getOtp();
        }

        // Si el OTP no existe o ha caducado
        otpStorage.remove(phoneNumber); // Eliminar OTP caducado
        return null;
    }

    // Método para formatear el número de teléfono
    public String formatPhoneNumber(String phoneNumber) {
        if (!phoneNumber.startsWith("+")) {
            phoneNumber = "+52" + phoneNumber;  // Asegúrate de usar el código de país correcto
        }
        return phoneNumber;
    }

    // Método para enviar OTP por SMS utilizando Twilio
    public boolean sendOtpToPhoneNumber(String phoneNumber, String otp) {
        try {
            // Formateamos el número de teléfono antes de enviarlo
            String formattedPhoneNumber = formatPhoneNumber(phoneNumber);

            // Enviar el OTP usando Twilio
            Message message = Message.creator(
                    new PhoneNumber(formattedPhoneNumber),   // Número de teléfono destino formateado
                    new PhoneNumber(fromPhoneNumber),        // Tu número de Twilio
                    "Tu código OTP es: " + otp               // Cuerpo del mensaje
            ).create();

            return true; // Si el mensaje fue enviado exitosamente
        } catch (Exception e) {
            e.printStackTrace();
            return false; // En caso de error al enviar el mensaje
        }
    }

    // Clase interna para almacenar OTP y fecha de caducidad
    private static class OTPDetails {
        private String otp;
        private LocalDateTime expiryTime;

        public OTPDetails(String otp, LocalDateTime expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }

        public String getOtp() {
            return otp;
        }

        public LocalDateTime getExpiryTime() {
            return expiryTime;
        }
    }
}
