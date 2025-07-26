package com.adventure.waveme.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adventure.waveme.po.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
