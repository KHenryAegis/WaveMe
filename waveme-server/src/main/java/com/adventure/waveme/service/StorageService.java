package com.adventure.waveme.service;

import org.springframework.web.multipart.MultipartFile;

import com.adventure.waveme.po.FileEntity;

public interface StorageService {
    FileEntity storeFile(MultipartFile file, String description);
    byte[] readFile(String filename);
}