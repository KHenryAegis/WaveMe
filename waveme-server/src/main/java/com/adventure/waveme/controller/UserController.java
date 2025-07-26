package com.adventure.waveme.controller;

import com.adventure.waveme.dao.UserRepository;
import com.adventure.waveme.po.TemplateEntity;
import com.adventure.waveme.po.User;

import com.adventure.waveme.dto.CreateUserRequest;
import com.adventure.waveme.dto.TemplateResponseDTO;
import com.adventure.waveme.dto.UserDataResponseDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/{braceletId}")
    public ResponseEntity<UserDataResponseDTO> getUserData(@PathVariable String braceletId) {

        // Use the custom repository method to get the user and all templates in one shot
        Optional<User> userOptional = userRepository.findByBraceletIdWithTemplates(braceletId);

        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();
        UserDataResponseDTO responseDTO = new UserDataResponseDTO(user.getBraceletColor());

        // 1. Find the Default Template based on user's sceneStyle
        if (user.getsceneStyle() != null && !user.getsceneStyle().isEmpty()) {
            String[] parts = user.getsceneStyle().split(":");
            if (parts.length == 2) {
                String defaultScene = parts[0];
                String defaultStyle = parts[1];

                user.getTemplates().stream()
                    .filter(t -> defaultScene.equals(t.getScene()) && defaultStyle.equals(t.getStyle()))
                    .findFirst()
                    .ifPresent(templateEntity -> responseDTO.setDefaultTemplate(mapToDTO(templateEntity)));
            }
        }

        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest req) {
        User user = new User(
            req.getPhone(),
            req.getBraceletId(),
            req.getSceneStyle(),
            req.getBraceletColor()
        );
        try {
            user = userRepository.save(user);
            return ResponseEntity.status(HttpStatus.OK).body(user);
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

    @GetMapping("/check-bracelet")
    public ResponseEntity<Map<String, Boolean>> checkBraceletIdExists(@RequestParam("id") String braceletId) {
        // 调用 UserRepository 中的 existsByBraceletId 方法
        boolean exists = userRepository.existsByBraceletId(braceletId);
        
        // 构建一个 Map 来生成一个结构化的 JSON 响应
        Map<String, Boolean> response = Collections.singletonMap("exists", exists);
        
        // 使用 ResponseEntity.ok() 返回 HTTP 200 OK 状态码和 JSON 响应体
        return ResponseEntity.ok(response);
    }

    private TemplateResponseDTO mapToDTO(TemplateEntity entity) {
        return new TemplateResponseDTO(entity.getScene(), entity.getStyle(), entity.getContent());
    }
}