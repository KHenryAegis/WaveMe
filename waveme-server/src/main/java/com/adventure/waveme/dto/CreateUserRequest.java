package com.adventure.waveme.dto;

public class CreateUserRequest {
    private String phone;
    private String braceletId;
    private String moduleId;
    private String braceletColor;

    // Getters & Setters
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

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getBraceletColor() {
        return braceletColor;
    }

    public void setBraceletColor(String braceletColor) {
        this.braceletColor = braceletColor;
    }

    
    @Override
    public String toString() {
        return "User{" +
                ", braceletId='" + braceletId + '\'' +
                ", phone='" + phone + '\'' +
                ", moduleId='" + moduleId + '\'' +
                ", braceletColor='" + braceletColor + '\'' +
                '}';
    }
}
