package com.utez.edu.integradorafraccionamiento.modules.tempVisit;

import com.utez.edu.integradorafraccionamiento.modules.resident.Resident;
import com.utez.edu.integradorafraccionamiento.modules.resident.ResidentService;
import com.utez.edu.integradorafraccionamiento.utils.CustomResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/external")
public class TemporaryVisitTokenController {
    @Autowired
    private ResidentService residentService;

    @Autowired
    private TemporaryVisitTokenService tokenService;
    @Autowired
    private CustomResponseEntity customResponseEntity;

    @Secured("ROLE_RESIDENT")
    @GetMapping("/generate-visit-link")
    public ResponseEntity<?> generateLink(Authentication authentication) {
        Resident resident = residentService.getResidentByTelefono(authentication.getName());

        if (resident == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Residente no encontrado"));
        }

        String token = tokenService.generateToken(resident.getId(), resident.getHouse().getId(), 60); // 10 minutos

        String url = "http://localhost:5173/scsvf/temp-create?token=" + token;

        Map<String, Object> response = new HashMap<>();
        response.put("url", url);
        response.put("expiresInMinutes", 60);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validate(@RequestParam String token) {
        boolean isValid = tokenService.isTokenValid(token);

        if (isValid) {
            return customResponseEntity.getOkResponse("Token válido", "SUCCESS", 200, null);
        } else {
            return customResponseEntity.get401Response("Token inválido o expirado");
        }
    }
}
