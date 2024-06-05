package com.bozicboris.boat_rental.repository;

import com.bozicboris.boat_rental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User, Integer> {
    List<User> findByDeletedAtIsNull();

    Optional<User> findByIdAndDeletedAtIsNull(Integer id);

    Optional<User> findByEmailAndDeletedAtIsNull(String email);
}
