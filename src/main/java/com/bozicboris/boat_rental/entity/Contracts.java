package com.bozicboris.boat_rental.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity(name = "rental")
@NoArgsConstructor
@Getter
@Setter
public class Contracts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rental_id")
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable =  false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "boat_id", nullable =  false)
    private Boat boat;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "total_cost")
    private Integer totalCost;

    @Column(name = "rental_status")
    private String rentalStatus;
    private LocalDateTime createdAt = LocalDateTime.now();
    @JsonIgnore
    private LocalDateTime deletedAt;


}
