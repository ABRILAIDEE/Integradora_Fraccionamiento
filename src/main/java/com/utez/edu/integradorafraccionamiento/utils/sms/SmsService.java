/* package com.utez.edu.integradorafraccionamiento.utils.sms;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service

public class SmsService {
    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String fromPhoneNumber;

    public SmsService() {
        // Initialize Twilio with account SID and Auth Token
        Twilio.init(accountSid, authToken);
    }

    public void sendOtp(String phoneNumber, String otpCode) {
        Message.creator(
                new PhoneNumber(phoneNumber), // Número de teléfono del destinatario
                new PhoneNumber(fromPhoneNumber), // Número de teléfono de Twilio
                "Tu código OTP es: " + otpCode // El mensaje del SMS
        ).create();
    }
} */
