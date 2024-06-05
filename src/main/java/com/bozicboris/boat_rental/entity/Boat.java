package com.bozicboris.boat_rental.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "boat")
@NoArgsConstructor
@Getter
@Setter
public class Boat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "boat_id")
    private Integer id;
    @Column(name = "boat_name")
    private String boatName;
    @Column(name = "type")
    private String type;
    @Column
    private String year;
    @Column
    private Integer capacity;
    @Column
    private Integer price;
    @Column
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column
    private LocalDateTime updatedAt;
    @JsonIgnore
    private LocalDateTime deletedAt;
}

