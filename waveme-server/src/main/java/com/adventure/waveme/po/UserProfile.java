package com.adventure.waveme.po;
import jakarta.persistence.*;
import lombok.Data;

@Data // Lombok 注解：自动生成 getters, setters, toString() 等样板代码
@Entity // 标记此类为一个 JPA 实体
@Table(name = "user_profiles") // 指定数据库中对应的表名
public class UserProfile {

    @Id // 标记 id 字段为主键
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 主键生成策略：数据库自增长
    private Long id;

    @Column(nullable = false) // 映射到数据库列，且该列不能为空
    private String nickname;

    @Column(nullable = false)
    private String avatar; // 存储头像图片的 URL

    @Column(columnDefinition = "TEXT") // 对于可能很长的简介，指定列类型为 TEXT
    private String bio;

    @Column(nullable = false)
    private String wechat; // 存储微信号

}