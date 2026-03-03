package sn.edu.ugb.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.edu.ugb.dtos.UserDTO;
import sn.edu.ugb.entities.User;
import sn.edu.ugb.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getUsers() {

        List<User> existedUsers = userRepository.findAll();
        List<UserDTO> users = new ArrayList<UserDTO>();

        for (User existedUser : existedUsers) {
            UserDTO user = new UserDTO(
                existedUser.getId(),
                existedUser.getUsername(),
                existedUser.getFirstname(),
                existedUser.getLastname()
            );

            users.add(user);
        }

        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok(new UserDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getFirstname(),
                        user.getLastname()
                )))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @RequestBody Map<String, String> passwords) {
        String newPassword = passwords.get("newPassword");
        
        return userRepository.findById(id)
                .map(user -> {
                    user.setPassword(newPassword);
                    user.setFirstname(user.getFirstname()); 
                    userRepository.save(user);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateProfile(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setFirstname(userDTO.getFirstname());
                    user.setLastname(userDTO.getLastname());
                    user.setUsername(userDTO.getUsername());
                    
                    User updatedUser = userRepository.save(user);
                    return ResponseEntity.ok(new UserDTO(
                            updatedUser.getId(),
                            updatedUser.getUsername(),
                            updatedUser.getFirstname(),
                            updatedUser.getLastname()
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}