package com.bozicboris.boat_rental.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.security.PrivilegedAction;

@NoArgsConstructor
@Getter
@Setter
public class UserModel {
    private String email;
    private String password;
    private String username;
    private String admin;



}
