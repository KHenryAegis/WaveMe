package com.adventure.waveme.po;

import jakarta.persistence.*;
import lombok.Data; // 使用 Lombok 简化代码

/**
 * Project 实体类，代表一个项目或应用展示项。
 * 该类映射到数据库中的 'projects' 表。
 */
@Data // Lombok 注解，自动生成 Getter, Setter, toString, EqualsAndHashCode 等方法
@Entity // 标记这是一个 JPA 实体
@Table(name = "projects") // 指定映射的数据库表名
public class Project {

    @Id // 标记这是主键
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 设置主键生成策略为自增长
    private Long id;

    @Column() // 数据库列，不允许为空
    private String name;

    @Column(columnDefinition = "TEXT") // 对于长文本，指定列定义为 TEXT 类型
    private String description;

    @Column()
    private String icon; // 图标的 URL

    @Column()
    private String type; // 项目类型, e.g., 'web', 'mobile'

    @Column()
    private String url; // 项目的链接

}