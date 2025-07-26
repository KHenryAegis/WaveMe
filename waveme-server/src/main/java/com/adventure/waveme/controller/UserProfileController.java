package com.adventure.waveme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.adventure.waveme.dao.UserProfileRepository;
import com.adventure.waveme.po.UserProfile;

import java.util.List;

/**
 * UserProfile 的 RESTful API 控制器。
 * 仅提供添加 (POST) 和查询 (GET) 功能。
 */
@RestController // 标记这是一个 REST 控制器，所有方法默认返回 JSON
@RequestMapping("/api/profiles") // 为此控制器下的所有 API 端点设置一个基础路径
public class UserProfileController {

    @Autowired // Spring 自动注入 UserProfileRepository 的实例
    private UserProfileRepository userProfileRepository;

    /**
     * **[查询]** 获取所有用户资料列表。
     * 对应 HTTP GET 请求: /api/profiles
     *
     * @return 包含所有用户资料的列表 (JSON 数组)
     */
    @GetMapping
    public List<UserProfile> getAllProfiles() {
        return userProfileRepository.findAll();
    }

    /**
     * **[查询]** 根据 ID 获取单个用户资料。
     * 对应 HTTP GET 请求: /api/profiles/{id}
     *
     * @param id 用户资料的 ID，从 URL 路径中获取
     * @return 如果找到，返回包含用户资料的 ResponseEntity 和 200 OK 状态；
     *         如果未找到，返回 404 Not Found 状态。
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getProfileById(@PathVariable Long id) {
        // findById 返回一个 Optional，这是处理可能为 null 的值的最佳实践
        return userProfileRepository.findById(id)
                .map(profile -> ResponseEntity.ok(profile)) // 如果存在，则包装成 200 OK 响应
                .orElse(ResponseEntity.notFound().build());   // 如果不存在，则返回 404
    }

    /**
     * **[添加]** 创建一个新的用户资料。
     * 对应 HTTP POST 请求: /api/profiles
     *
     * @param userProfile 从请求体 (Request Body) 中获取的 JSON 数据，并自动转换为 UserProfile 对象
     * @return 返回创建成功的用户资料 (包含新生成的ID) 和 201 Created 状态
     */
    @PostMapping
    public ResponseEntity<UserProfile> createProfile(@RequestBody UserProfile userProfile) {
        // id 字段在保存时由数据库自动生成，所以请求体中可以不包含 id
        UserProfile savedProfile = userProfileRepository.save(userProfile);
        return new ResponseEntity<>(savedProfile, HttpStatus.CREATED);
    }
}
