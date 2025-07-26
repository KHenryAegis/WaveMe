package com.adventure.waveme.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.adventure.waveme.dao.FileRepository;
import com.adventure.waveme.dao.TemplateRepository;
import com.adventure.waveme.dao.UserRepository;
import com.adventure.waveme.po.FileEntity;
import com.adventure.waveme.po.TemplateEntity;
import com.adventure.waveme.po.User;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/templates")
public class TemplateController {

    private final TemplateRepository templateRepository;
    private final UserRepository userRepository;
    private final FileRepository fileRepository;

    public TemplateController(TemplateRepository templateRepository, UserRepository userRepository, FileRepository fileRepository) {
        this.templateRepository = templateRepository;
        this.userRepository = userRepository;
        this.fileRepository = fileRepository;
    }

    // 创建模板
    @PostMapping("/create")
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
        if (templates.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
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


    @PutMapping("/{braceletId}/{scene}/gallery")
    @Transactional
    public ResponseEntity<TemplateEntity> updateTemplateGallery(
            @PathVariable String braceletId,
            @PathVariable String scene,
            @RequestParam String style,
            @RequestParam("data") List<Long> fileIds) {

        // 1. 查找要更新的模板
        Optional<TemplateEntity> templateOpt = templateRepository.findByBraceletIdAndScene(braceletId, scene);
        if (templateOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        TemplateEntity template = templateOpt.get();

        // 2. 获取或创建 content Map
        Map<String, String> content = template.getContent();
        if (content == null) {
            content = new HashMap<>();
        }

        // 3. 将文件ID列表转换为逗号分隔的字符串
        // 例如 [1, 5, 12] -> "1,5,12"
        String galleryIdsString = fileIds.stream()
                                         .map(String::valueOf)
                                         .collect(Collectors.joining(","));

        // 4. 将ID字符串存入 content Map，使用预定义的常量作为key
        content.put(TemplateEntity.Fields.PORTFOLIO_GALLERY, galleryIdsString);
        template.setContent(content);

        // 5. 更新 style
        template.setStyle(style);

        // 6. 保存并返回更新后的模板
        TemplateEntity savedTemplate = templateRepository.save(template);
        return ResponseEntity.ok(savedTemplate);
    }

    /**
     * 接口 2: 根据 braceletId, scene, 和 style 获取画廊的文件内容.
     * @param braceletId 手环ID
     * @param scene      场景名称
     * @param style      风格名称 (用于验证)
     * @return 对应的文件实体列表
     */
    @GetMapping("/{braceletId}/{scene}/gallery")
    public ResponseEntity<List<FileEntity>> getTemplateGallery(
            @PathVariable String braceletId,
            @PathVariable String scene,
            @RequestParam String style) {

        // 1. 查找模板
        Optional<TemplateEntity> templateOpt = templateRepository.findByBraceletIdAndScene(braceletId, scene);

        // 2. 验证模板是否存在，并且风格是否匹配
        if (templateOpt.isEmpty() || !templateOpt.get().getStyle().equals(style)) {
            return ResponseEntity.notFound().build();
        }
        TemplateEntity template = templateOpt.get();

        // 3. 从 content Map 中获取画廊ID字符串
        Map<String, String> content = template.getContent();
        if (content == null || !content.containsKey(TemplateEntity.Fields.PORTFOLIO_GALLERY)) {
            // 如果没有画廊内容，返回一个空列表
            return ResponseEntity.ok(Collections.emptyList());
        }
        String galleryIdsString = content.get(TemplateEntity.Fields.PORTFOLIO_GALLERY);
        if (galleryIdsString == null || galleryIdsString.trim().isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        // 4. 将ID字符串解析为 Long 类型的列表
        List<Long> fileIds;
        try {
            fileIds = Arrays.stream(galleryIdsString.split(","))
                            .map(Long::parseLong)
                            .collect(Collectors.toList());
        } catch (NumberFormatException e) {
            // 如果ID格式错误，返回一个错误请求
            return ResponseEntity.badRequest().build();
        }
        
        // 5. 使用ID列表从文件表中查询所有对应的文件
        List<FileEntity> files = fileRepository.findAllById(fileIds);
        
        return ResponseEntity.ok(files);
    }
}
