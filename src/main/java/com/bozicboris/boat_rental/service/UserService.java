package com.bozicboris.boat_rental.service;

import com.bozicboris.boat_rental.entity.Boat;
import  com.bozicboris.boat_rental.entity.User;
import com.bozicboris.boat_rental.model.UserModel;
import com.bozicboris.boat_rental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public List<User> getAllUsers() {
        return userRepository.findByDeletedAtIsNull();
    }
    public Optional<User> getUserById(Integer id) {
        return userRepository.findByIdAndDeletedAtIsNull(id);
    }
    public Optional<User> getStudentByEmail(String email) {
        return userRepository.findByEmailAndDeletedAtIsNull(email);
    }
    public User createUser(UserModel userModel) {
        User user = new User();
        user.setEmail(userModel.getEmail());
        user.setPassword(userModel.getPassword());
        user.setUsername(userModel.getUsername());
        user.setAdmin(Boolean.parseBoolean(userModel.getAdmin()));
        return userRepository.save(user);
    }
    public User updateUser(Integer id, UserModel userModel) {
        User user = userRepository.findByIdAndDeletedAtIsNull(id).orElseThrow();
        user.setEmail(userModel.getEmail());
        user.setPassword(userModel.getPassword());
        user.setUsername(userModel.getUsername());
        return userRepository.save(user);
    }
    public void deleteUser(Integer id) {
        User user = userRepository.findByIdAndDeletedAtIsNull(id).orElseThrow();
        user.setDeletedAt(LocalDateTime.now());
        userRepository.save(user);
    }

}
