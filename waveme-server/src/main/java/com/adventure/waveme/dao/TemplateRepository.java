package com.adventure.waveme.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.adventure.waveme.po.TemplateEntity;

import java.util.List;
import java.util.Optional;

public interface TemplateRepository extends JpaRepository<TemplateEntity, Long> {
    
    // 根据braceletId和scene查询模板
    @Query("SELECT t FROM TemplateEntity t JOIN t.user u WHERE u.braceletId = :braceletId AND t.scene = :scene")
    Optional<TemplateEntity> findByBraceletIdAndScene(
            @Param("braceletId") String braceletId, 
            @Param("scene") String scene);
    
    // 根据braceletId查询所有模板
    @Query("SELECT t FROM TemplateEntity t JOIN t.user u WHERE u.braceletId = :braceletId")
    List<TemplateEntity> findTemplateByBraceletId(@Param("braceletId") String braceletId);
    
    // 删除特定用户的模板
    @Query("DELETE FROM TemplateEntity t WHERE t.user.id = (SELECT u.id FROM User u WHERE u.braceletId = :braceletId)")
    void deleteTemplateByBraceletId(@Param("braceletId") String braceletId);
}