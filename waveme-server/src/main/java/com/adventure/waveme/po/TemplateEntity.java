package com.adventure.waveme.po;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "templates", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "scene"}))
public class TemplateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "bracelet_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String scene;  // 场景名称 (如: resume, portfolio, social)

    @Column(nullable = false)
    private String style;  // 风格名称 (如: professional, creative, minimalist)

    @ElementCollection
    @CollectionTable(name = "template_content", 
                     joinColumns = @JoinColumn(name = "template_id"))
    @MapKeyColumn(name = "content_key")
    @Column(name = "content_value", length = 2048)
    private Map<String, String> content;  // 动态内容字段

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 定义不同场景的标准字段（作为常量）
    public static class Fields {

        // 作品集场景字段
        public static final String PORTFOLIO_GALLERY = "gallery";
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getScene() {
        return scene;
    }

    public void setScene(String scene) {
        this.scene = scene;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public Map<String, String> getContent() {
        return content;
    }

    public void setContent(Map<String, String> content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}