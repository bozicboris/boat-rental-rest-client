package com.bozicboris.boat_rental.repository;

import com.bozicboris.boat_rental.entity.Boat;
import com.bozicboris.boat_rental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoatRepository extends JpaRepository<Boat, Integer> {
    List<Boat> findByDeletedAtIsNull();
    Optional<Boat> findByIdAndDeletedAtIsNull(Integer id);
    List<Boat> findByTypeContainsAndDeletedAtIsNull(String type);
    List<Boat> findByCapacityAndDeletedAtIsNull(Integer capacity);


}
