    package com.utez.edu.integradorafraccionamiento.modules.employee;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.access.annotation.Secured;
    import org.springframework.security.core.Authentication;
    import org.springframework.web.bind.annotation.*;

    @CrossOrigin(origins = {"*"})
    @RestController
    @RequestMapping("/api/empleados")
    public class EmployeeController {

        @Autowired
        private EmployeeService employeeService;

        @GetMapping
        @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo administradores y guardias pueden ver la lista de empleados
        public ResponseEntity<?> findAll() {
            return employeeService.findAll();
        }

        @GetMapping("/me")
        @Secured({"ROLE_ADMIN", "ROLE_GUARD", "ROLE_RESIDENT"})
        public ResponseEntity<?> getCurrentEmployee(Authentication authentication) {
            String username = authentication.getName();  // Usamos el nombre de usuario del JWT o el autenticado
            return employeeService.findByEmail(username);  // Usamos el email para buscar el empleado
        }
        // Endpoint para actualizar el perfil (por email del usuario autenticado)
        @PutMapping("/me")
        public ResponseEntity<?> updateProfile(@RequestBody Employee updated, Authentication authentication) {
            String email = authentication.getName();

            return employeeService.updateByEmail(email, updated);
        }

        @GetMapping("/{id}")
        @Secured({"ROLE_ADMIN", "ROLE_GUARD"}) // Solo administradores y guardias pueden ver detalles de un empleado
        public ResponseEntity<?> findById(@PathVariable long id) {
            return employeeService.findById(id);
        }

        @PostMapping
        @Secured("ROLE_ADMIN") // Solo los administradores pueden registrar empleados
        public ResponseEntity<?> save(@RequestBody Employee employee) {
            return employeeService.save(employee);
        }

        @PutMapping("/{id}")
        @Secured("ROLE_ADMIN") // Solo los administradores pueden actualizar empleados
        public ResponseEntity<?> update(@PathVariable long id, @RequestBody Employee employee) {
            return employeeService.update(employee, id);
        }

        @PatchMapping("/{id}/estado")
        @Secured("ROLE_ADMIN") // Solo los administradores pueden cambiar el estado de un empleado
        public ResponseEntity<?> updateStatus(@PathVariable long id, @RequestBody Employee employee) {
            return employeeService.updateStatus(id, employee.getEstado());
        }

        //Filtrar solo guardias
        @GetMapping("/guardias")
        @Secured("ROLE_ADMIN") // Solo admins pueden consultar todos los guardias, ajusta según tus reglas
        public ResponseEntity<?> findAllGuards() {
            return employeeService.findAllGuards();
        }


    }
