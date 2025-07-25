package com.adventure.waveme.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.adventure.waveme.po.FileEntity;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
}
