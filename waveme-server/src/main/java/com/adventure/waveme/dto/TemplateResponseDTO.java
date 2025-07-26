package com.adventure.waveme.dto;

import java.util.Map;

public class TemplateResponseDTO {
    private String scene;
    private String style;
    private Map<String, String> content;

    public TemplateResponseDTO(String scene, String style, Map<String, String> content) {
        this.scene = scene;
        this.style = style;
        this.content = content;
    }

    // Getters and Setters
    public String getScene() { return scene; }
    public void setScene(String scene) { this.scene = scene; }
    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }
    public Map<String, String> getContent() { return content; }
    public void setContent(Map<String, String> content) { this.content = content; }
}