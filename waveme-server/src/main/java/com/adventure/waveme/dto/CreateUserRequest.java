package com.adventure.waveme.dto;

public class CreateUserRequest {
    private String phone;
    private String braceletId;
    private String sceneStyle;
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

    public String getSceneStyle() {
        return sceneStyle;
    }
    public void setSceneStyle(String sceneStyle) {
        this.sceneStyle = sceneStyle;
    }

    public String getBraceletColor() {
        return braceletColor;
    }

    public void setBraceletColor(String braceletColor) {
        this.braceletColor = braceletColor;
    }


}
