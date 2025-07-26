package com.adventure.waveme.dao;

import com.adventure.waveme.po.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByPhone(String phone);
    Optional<User> findByBraceletId(String braceletId);
    boolean existsByBraceletId(String braceletId);
    
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.templates WHERE u.braceletId = :braceletId")
    Optional<User> findByBraceletIdWithTemplates(@Param("braceletId") String braceletId);
}
