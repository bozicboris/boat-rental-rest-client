package com.bozicboris.boat_rental.service;

import com.bozicboris.boat_rental.entity.Boat;
import com.bozicboris.boat_rental.model.BoatModel;
import com.bozicboris.boat_rental.repository.BoatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoatService {
    private final BoatRepository boatRepository;
    public List<Boat> getAllBoats() {
        return boatRepository.findByDeletedAtIsNull();
    }
    public Optional<Boat> getBoatById(Integer id) {
        return boatRepository.findByIdAndDeletedAtIsNull(id);
    }
    public List<Boat> getBoatByType(String type) {
        return boatRepository.findByTypeContainsAndDeletedAtIsNull(type);
    }
    public List<Boat> getBoatByCapacity(Integer capacity) {
        return boatRepository.findByCapacityAndDeletedAtIsNull(capacity);
    }
    public Boat createBoat(BoatModel boatModel) {
        Boat boat = new Boat();
        boat.setBoatName(boatModel.getBoatName());
        boat.setType(boatModel.getType());
        boat.setYear(boatModel.getYear());
        boat.setCapacity(boatModel.getCapacity());
        boat.setPrice(boatModel.getPrice());
        boat.setId(null);
        return boatRepository.save(boat);
    }
    public Boat updateBoat(Integer id, BoatModel boatModel) {
        Boat boat = boatRepository.findByIdAndDeletedAtIsNull(id).orElseThrow();
        boat.setBoatName(boatModel.getBoatName());
        boat.setType(boatModel.getType());
        boat.setYear(boatModel.getYear());
        boat.setCapacity(boatModel.getCapacity());
        boat.setPrice(boatModel.getPrice());
        return boatRepository.save(boat);
    }
    public void deleteBoat(Integer id) {
        Boat boat = boatRepository.findByIdAndDeletedAtIsNull(id).orElseThrow();
        boat.setDeletedAt(LocalDateTime.now());
        boatRepository.save(boat);
    }
}
