package com.bozicboris.boat_rental.repository;

import com.bozicboris.boat_rental.entity.Boat;
import com.bozicboris.boat_rental.entity.Contracts;
import com.bozicboris.boat_rental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface ContractsRepository  extends JpaRepository<Contracts, Integer> {
    Optional<Contracts> findByIdAndDeletedAtIsNull(Integer id);
    Optional<Contracts> findByUserIdAndDeletedAtIsNull(Integer user);
    Optional<Contracts> findByBoatIdAndDeletedAtIsNull(Integer boat);


}
