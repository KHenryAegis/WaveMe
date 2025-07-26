package com.adventure.waveme.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.adventure.waveme.po.FileEntity;

@Service
@Primary
public class StorageServiceFactory implements StorageService {
    private final StorageService delegate;

    public StorageServiceFactory(@Value("${file.storage-type}") String storageType,
                                 LocalStorageService localStorageService,
                                 MinioStorageService minioStorageService) {
       if ("minio".equalsIgnoreCase(storageType)) {
            this.delegate = minioStorageService;
        } else {
            this.delegate = localStorageService;
        }
    }

    @Override
    public FileEntity storeFile(org.springframework.web.multipart.MultipartFile file) {
        return delegate.storeFile(file);
    }

    @Override
    public byte[] readFile(String filename) {
        return delegate.readFile(filename);
    }
}