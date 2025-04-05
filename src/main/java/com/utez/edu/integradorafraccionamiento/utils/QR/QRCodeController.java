package com.utez.edu.integradorafraccionamiento.utils.QR;

import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/qr")
public class QRCodeController {

    @Autowired
    private QRCodeService qrCodeService;

    @GetMapping(value = "/{visitId}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getQRCode(@PathVariable("visitId") Long visitId) {
        try {
            // Construir el contenido del QR (puede ser una URL o JSON con datos relevantes)
            String qrText = "https://localhost:8080/visitas/" + visitId;
            byte[] qrImage = qrCodeService.generateQRCodeImage(qrText, 250, 250);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"qr_"+visitId+".png\"")
                    .body(qrImage);
        } catch (WriterException | IOException e) {
            // Manejar el error adecuadamente
            return ResponseEntity.status(500).build();
        }
    }
}
