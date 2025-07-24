package com.adventure.waveme.po;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // 主账号或子账号

    @Column(nullable = false)
    private Date createdAt;

    @Column(name = "wechat_qr_path", length = 2048)
    private String wechatQrPath; // 新增微信二维码路径字段

    // getter和setter
    public String getWechatQrPath() {
        return wechatQrPath;
    }

    public void setWechatQrPath(String wechatQrPath) {
        this.wechatQrPath = wechatQrPath;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}