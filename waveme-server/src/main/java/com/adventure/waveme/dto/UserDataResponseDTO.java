package com.adventure.waveme.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDataResponseDTO {

    private String braceletColor;
    private TemplateResponseDTO defaultTemplate;

    public UserDataResponseDTO(String braceletColor) {
        this.braceletColor = braceletColor;
    }

    // Getters and Setters
    public String getBraceletColor() { return braceletColor; }
    public void setBraceletColor(String braceletColor) { this.braceletColor = braceletColor; }
    public TemplateResponseDTO getDefaultTemplate() { return defaultTemplate; }
    public void setDefaultTemplate(TemplateResponseDTO defaultTemplate) { this.defaultTemplate = defaultTemplate; }
}
