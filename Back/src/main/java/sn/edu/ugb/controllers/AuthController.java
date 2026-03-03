package sn.edu.ugb.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sn.edu.ugb.dtos.UserDTO;
import sn.edu.ugb.entities.User;
import sn.edu.ugb.repositories.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        return userRepository.findByUsername(username)
            .filter(user -> user.getPassword().equals(password))
            .map(user -> ResponseEntity.status(HttpStatus.OK).body(user)) 
            .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody User user) {
        
    if (userRepository.findByUsername(user.getUsername()).isPresent()) {
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }


    User newUser = new User();
    newUser.setUsername(user.getUsername());
    newUser.setPassword(user.getPassword()); 
    newUser.setLastname(user.getLastname());
    newUser.setFirstname(user.getFirstname());

    User savedUser = userRepository.save(newUser);

    UserDTO response = new UserDTO(
        savedUser.getId(),
        savedUser.getUsername(),
        savedUser.getFirstname(),
        savedUser.getLastname()
    );

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
