package com.bozicboris.boat_rental.model;

import com.bozicboris.boat_rental.entity.Boat;
import com.bozicboris.boat_rental.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ContractsModel {
    private User user;
    private Boat boat;
    private String startDate;
    private String endDate;
    private Integer totalCost;
    private String rentalStatus;
}
