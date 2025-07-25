package com.adventure.waveme.dao;

import com.adventure.waveme.po.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByPhone(String phone);
    Optional<User> findByBraceletId(String braceletId);
}
