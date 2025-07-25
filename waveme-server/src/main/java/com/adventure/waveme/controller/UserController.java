package com.adventure.waveme.controller;

import com.adventure.waveme.dao.UserRepository;
import com.adventure.waveme.po.User;

import com.adventure.waveme.dto.CreateUserRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest req) {
        System.out.println("Creating user with request: " + req);
        User user = new User(
            req.getPhone(),
            req.getBraceletId(),
            req.getModuleId(),
            req.getBraceletColor()
        );
        try {
            user = userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("error", "Database error", "details", e.getMessage()));
        }
    }

    @GetMapping("/getUserByPhone")
    public ResponseEntity<?> getUserByPhone(@RequestParam(required = false) String phone) {
        if (phone == null || phone.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(Map.of("error", "Missing phone parameter"));
        }
        try {
            Optional<User> optionalUser = userRepository.findByPhone(phone);
            if (optionalUser.isPresent()) {
                return ResponseEntity.ok(optionalUser.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                     .body(Map.of("error", "User not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("error", "Database error", "details", e.getMessage()));
        }
    }

}