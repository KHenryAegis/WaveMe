package com.adventure.waveme.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.adventure.waveme.dao.FileRepository;
import com.adventure.waveme.po.FileEntity;

import java.io.IOException;
import java.nio.file.*;

@Service
public class LocalStorageService implements StorageService {
    private final Path uploadDir;
    private final FileRepository fileRepository;

    public LocalStorageService(@Value("${file.upload-dir}") String uploadDir, FileRepository fileRepository) {
        this.uploadDir = Paths.get(uploadDir).toAbsolutePath().normalize();
        this.fileRepository = fileRepository;
        try {
            Files.createDirectories(this.uploadDir);
        } catch (IOException ex) {
            throw new RuntimeException("Could not create upload directory!", ex);
        }
    }

    @Override
    public FileEntity storeFile(MultipartFile file, String description) {
        String original = StringUtils.cleanPath(file.getOriginalFilename());
        String filename = System.currentTimeMillis() + "_" + original;
        try {
            Path target = this.uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            String url = "/uploads/" + filename;
            return fileRepository.save(new FileEntity(filename, url, description, target.toString()));
        } catch (IOException ex) {
            throw new RuntimeException("Failed to store file " + filename, ex);
        }
    }

    @Override
    public byte[] readFile(String filename) {
        try {
            Path filePath = this.uploadDir.resolve(filename).normalize();
            return Files.readAllBytes(filePath);
        } catch (IOException ex) {
            throw new RuntimeException("Could not read file " + filename, ex);
        }
    }
}