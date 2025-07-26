package com.adventure.waveme.po;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

     @Column(name = "bracelet_id", nullable = false, unique = true)
    private String braceletId;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(name = "scene_style")
    private String sceneStyle;

    @Column(name = "bracelet_color")
    private String braceletColor;

    @JsonManagedReference 
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TemplateEntity> templates;

    public User() {}

    public User(String phone, String braceletId, String sceneStyle, String braceletColor) {
        this.phone = phone;
        this.braceletId = braceletId;
        this.sceneStyle = sceneStyle;
        this.braceletColor = braceletColor;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBraceletId() {
        return braceletId;
    }

    public void setBraceletId(String braceletId) {
        this.braceletId = braceletId;
    }

    public String getsceneStyle() {
        return sceneStyle;
    }

    public void setsceneStyle(String sceneStyle) {
        this.sceneStyle = sceneStyle;
    }

    public String getBraceletColor() {
        return braceletColor;
    }

    public void setBraceletColor(String braceletColor) {
        this.braceletColor = braceletColor;
    }

    public List<TemplateEntity> getTemplates() {
        return templates;
    }

    public void setTemplates(List<TemplateEntity> templates) {
        this.templates = templates;
    }

}  
