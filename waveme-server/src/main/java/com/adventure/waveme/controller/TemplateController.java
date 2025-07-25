package com.adventure.waveme.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.adventure.waveme.dao.TemplateRepository;
import com.adventure.waveme.dao.UserRepository;
import com.adventure.waveme.po.TemplateEntity;
import com.adventure.waveme.po.User;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/templates")
public class TemplateController {

    private final TemplateRepository templateRepository;
    private final UserRepository userRepository;

    public TemplateController(TemplateRepository templateRepository, UserRepository userRepository) {
        this.templateRepository = templateRepository;
        this.userRepository = userRepository;
    }

    // 创建模板
    @PostMapping
    @Transactional
    public ResponseEntity<TemplateEntity> createTemplate(
            @RequestParam String braceletId,
            @RequestParam String scene,
            @RequestParam String style,
            @RequestBody Map<String, String> content) {
        
        // 查找用户
        Optional<User> user = userRepository.findByBraceletId(braceletId);
        if (!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        // 检查是否已存在相同场景的模板
        Optional<TemplateEntity> existingTemplate = templateRepository.findByBraceletIdAndScene(braceletId, scene);
        if (existingTemplate.isPresent()) {
            return ResponseEntity.badRequest().body(null); // 或返回冲突状态
        }
        
        TemplateEntity template = new TemplateEntity();
        template.setUser(user.get());
        template.setScene(scene);
        template.setStyle(style);
        template.setContent(content);
        
        template = templateRepository.save(template);
        return ResponseEntity.ok(template);
    }

    // 获取特定模板
    @GetMapping("/{braceletId}/{scene}")
    public ResponseEntity<TemplateEntity> getTemplate(
            @PathVariable String braceletId,
            @PathVariable String scene) {
        
        Optional<TemplateEntity> template = templateRepository.findByBraceletIdAndScene(braceletId, scene);
        return template.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 获取用户所有模板
    @GetMapping("/{braceletId}")
    public ResponseEntity<List<TemplateEntity>> getUserTemplates(
            @PathVariable String braceletId) {
        
        List<TemplateEntity> templates = templateRepository.findTemplateByBraceletId(braceletId);
        return ResponseEntity.ok(templates);
    }

    // 更新模板
    @PutMapping("/{braceletId}/{scene}")
    @Transactional
    public ResponseEntity<TemplateEntity> updateTemplate(
            @PathVariable String braceletId,
            @PathVariable String scene,
            @RequestParam(required = false) String style,
            @RequestBody(required = false) Map<String, String> content) {
        
        Optional<TemplateEntity> templateOpt = templateRepository.findByBraceletIdAndScene(braceletId, scene);
        if (!templateOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        TemplateEntity template = templateOpt.get();
        if (style != null) {
            template.setStyle(style);
        }
        if (content != null) {
            template.setContent(content);
        }
        
        template = templateRepository.save(template);
        return ResponseEntity.ok(template);
    }

    // 删除模板
    @DeleteMapping("/{braceletId}/{scene}")
    @Transactional
    public ResponseEntity<Void> deleteTemplate(
            @PathVariable String braceletId,
            @PathVariable String scene) {
        
        Optional<TemplateEntity> template = templateRepository.findByBraceletIdAndScene(braceletId, scene);
        if (!template.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        templateRepository.delete(template.get());
        return ResponseEntity.noContent().build();
    }
}