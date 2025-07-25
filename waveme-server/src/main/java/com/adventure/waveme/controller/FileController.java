package com.adventure.waveme.controller;

import com.adventure.waveme.dto.UploadFileResponse;
import com.adventure.waveme.po.FileEntity;
import com.adventure.waveme.service.StorageServiceFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileController {
    @Autowired
    private StorageServiceFactory storageService;

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        FileEntity saved = storageService.storeFile(file);
        UploadFileResponse resp = new UploadFileResponse(saved.getId(), saved.getName(), saved.getUrl());
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<ByteArrayResource> download(@PathVariable String filename) {
        byte[] data = storageService.readFile(filename);
        ByteArrayResource resource = new ByteArrayResource(data);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDisposition(ContentDisposition.attachment().filename(filename).build());
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(data.length)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
