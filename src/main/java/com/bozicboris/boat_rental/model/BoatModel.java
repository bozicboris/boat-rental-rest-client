package com.bozicboris.boat_rental.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BoatModel {
    private String boatName;
    private String type;
    private String year;
    private Integer capacity;
    private Integer price;
}
