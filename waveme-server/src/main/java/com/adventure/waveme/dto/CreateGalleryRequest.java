package com.adventure.waveme.dto;

import java.util.List;



public class CreateGalleryRequest {
    
    private String style;
    private List<Long> data;

    public CreateGalleryRequest(String style, List<Long> data) {
        this.style = style;
        this.data = data;
    }
    // Getters and Setters
    public String getStyle() {
        return style;
    }
    public void setStyle(String style) {
        this.style = style;
    }
    public List<Long> getData() {
        return data;
    }
    public void setData(List<Long> data) {
        this.data = data;
    }
}
