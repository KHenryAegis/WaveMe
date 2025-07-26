package com.adventure.waveme.dao;

import com.adventure.waveme.po.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // 声明这是一个 Spring Bean，用于数据持久化
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

}