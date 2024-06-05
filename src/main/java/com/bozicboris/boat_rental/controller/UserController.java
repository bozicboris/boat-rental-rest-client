package com.bozicboris.boat_rental.controller;

import com.bozicboris.boat_rental.entity.Boat;
import com.bozicboris.boat_rental.entity.User;
import com.bozicboris.boat_rental.model.UserModel;
import com.bozicboris.boat_rental.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    private final UserService userService;
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping(path = "/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        return ResponseEntity.of(userService.getUserById(id));
    }
    @GetMapping(path = "/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.of(userService.getStudentByEmail(email));
    }
    @PostMapping
    public User createUser(@RequestBody UserModel user) {
        return userService.createUser(user);
    }
    @PutMapping(path = "/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody UserModel user) {
        return userService.updateUser(id, user);
    }
    @DeleteMapping(path ="/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteBoat(@PathVariable Integer id) {
        userService.deleteUser(id);
    }
}

