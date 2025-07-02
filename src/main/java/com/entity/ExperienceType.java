package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class ExperienceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "experience_name", length = 100)
    private String experienceName;

    @Nationalized
    @Column(name = "description", length = 500)
    private String description;

    @Nationalized
    @Column(name = "icon_class", length = 100)
    private String iconClass;

    @OneToMany(mappedBy = "type")
    @JsonManagedReference

    private Set<Experience> experiences = new LinkedHashSet<>();

}