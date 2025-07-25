package com.adventure.waveme.service;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.GetObjectArgs;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.adventure.waveme.dao.FileRepository;
import com.adventure.waveme.po.FileEntity;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

@Service
public class MinioStorageService implements StorageService {

    private final MinioClient minioClient;
    private final FileRepository fileRepository;
    private final String bucket;

    public MinioStorageService(@Value("${minio.url}") String url,
                               @Value("${minio.access-key}") String accessKey,
                               @Value("${minio.secret-key}") String secretKey,
                               @Value("${minio.bucket}") String bucket,
                               FileRepository fileRepository) {
        this.minioClient = MinioClient.builder().endpoint(url).credentials(accessKey, secretKey).build();
        this.bucket = bucket;
        this.fileRepository = fileRepository;
    }

    @Override
    public FileEntity storeFile(MultipartFile file) {
        try {
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(bucket)
                    .object(filename)
                    .stream(file.getInputStream(), file.getSize(), -1)
                    .contentType(file.getContentType())
                    .build());
            String url = "/minio/" + bucket + "/" + filename; // 可根据 nginx 或 minio 网关调整
            return fileRepository.save(new FileEntity(filename, url, bucket + "/" + filename));
        } catch (Exception e) {
            throw new RuntimeException("Minio store file failed", e);
        }
    }

    @Override
    public byte[] readFile(String filename) {
        try (InputStream stream = minioClient.getObject(GetObjectArgs.builder().bucket(bucket).object(filename).build());
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            stream.transferTo(baos);
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Minio read file failed", e);
        }
    }
}