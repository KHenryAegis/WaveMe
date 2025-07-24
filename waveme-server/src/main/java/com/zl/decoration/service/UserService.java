package com.zl.decoration.service;

import com.zl.decoration.dao.UserRepository;
import com.zl.decoration.exception.ResourceNotFoundException;
import com.zl.decoration.po.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

// 2. Service 实现
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // 创建用户
    public User createUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("用户名已存在");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(new Date());
        return userRepository.save(user);
    }

    // 更新用户
    public User updateUser(Long id, User updatedUser, boolean flag) {
        return userRepository.findById(id).map(user -> {
            if (!user.getUsername().equals(updatedUser.getUsername()) &&
                    userRepository.existsByUsername(updatedUser.getUsername())) {
                throw new IllegalArgumentException("用户名已存在");
            }
            user.setUsername(updatedUser.getUsername());
            if (flag && updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            user.setRole(updatedUser.getRole());
            return userRepository.save(user);
        }).orElseThrow(() -> new ResourceNotFoundException("用户不存在"));
    }

    // 删除用户
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("用户不存在"));
        userRepository.delete(user);
    }

    // 获取所有用户
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 根据ID获取用户
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("用户不存在"));
    }

    // 从安全上下文中获取当前用户
    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof org.springframework.security.core.userdetails.User)) {
            throw new UsernameNotFoundException("当前用户不存在");
        }
        org.springframework.security.core.userdetails.User auser = (org.springframework.security.core.userdetails.User) auth.getPrincipal();

        Optional<User> userOpt = userRepository.findByUsername(auser.getUsername());

        if (userOpt.isEmpty()) {
            throw new BadCredentialsException("用户不存在");
        }

        User user = userOpt.get();
        return user;
    }
}