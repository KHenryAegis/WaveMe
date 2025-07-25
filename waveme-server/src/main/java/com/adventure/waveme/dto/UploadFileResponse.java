package com.adventure.waveme.dto;

public class UploadFileResponse {
    private Long id;
    private String name;
    private String url;
    public UploadFileResponse(Long id, String name, String url) {
        this.id = id;
        this.name = name;
        this.url = url;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
}