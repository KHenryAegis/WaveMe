package com.adventure.waveme.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adventure.waveme.dao.ProjectRepository;
import com.adventure.waveme.po.Project;

/**
 * Project 控制器，提供关于项目的 RESTful API 端点。
 */
@RestController // 标记这是一个 REST 控制器，返回的都是 JSON 数据
@RequestMapping("/api/projects") // 为该控制器下的所有端点设置一个统一的基础路径
public class ProjectController {

    @Autowired // 自动注入 ProjectRepository 的实例
    private ProjectRepository projectRepository;

    /**
     * 获取所有项目列表
     * GET /api/projects
     * @return 项目列表
     */
    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    /**
     * 根据 ID 获取单个项目
     * GET /api/projects/{id}
     * @param id 项目ID
     * @return 如果找到，返回项目和 200 OK；否则返回 404 Not Found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable(value = "id") Long id) {
        return projectRepository.findById(id)
                .map(project -> ResponseEntity.ok(project)) // 如果找到，返回 200
                .orElse(ResponseEntity.notFound().build()); // 如果没找到，返回 404
    }

    /**
     * 创建一个新项目
     * POST /api/projects
     * @param project 从请求体中获取的项目数据
     * @return 创建成功后的项目实体和 201 Created 状态
     */
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project savedProject = projectRepository.save(project);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    /**
     * 根据 ID 更新一个已有的项目
     * PUT /api/projects/{id}
     * @param id 要更新的项目ID
     * @param projectDetails 新的项目数据
     * @return 如果更新成功，返回更新后的项目和 200 OK；否则返回 404 Not Found
     */
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable(value = "id") Long id, @RequestBody Project projectDetails) {
        return projectRepository.findById(id)
                .map(existingProject -> {
                    existingProject.setName(projectDetails.getName());
                    existingProject.setDescription(projectDetails.getDescription());
                    existingProject.setIcon(projectDetails.getIcon());
                    existingProject.setType(projectDetails.getType());
                    existingProject.setUrl(projectDetails.getUrl());
                    Project updatedProject = projectRepository.save(existingProject);
                    return ResponseEntity.ok(updatedProject);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}