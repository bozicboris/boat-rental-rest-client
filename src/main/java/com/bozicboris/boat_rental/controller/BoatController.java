package com.bozicboris.boat_rental.controller;

import com.bozicboris.boat_rental.entity.Boat;
import com.bozicboris.boat_rental.model.BoatModel;
import com.bozicboris.boat_rental.service.BoatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/boat")
@RequiredArgsConstructor
@CrossOrigin
public class BoatController {
    private final BoatService boatService;
    @GetMapping
    public List<Boat> getAllBoats() {
        return boatService.getAllBoats();
    }
    @GetMapping(path = "/{id}")
    public Optional<Boat> getBoatById(@PathVariable Integer id) {
        return boatService.getBoatById(id);
    }
    @GetMapping(path = "/type/{type}")
    public List<Boat> getBoatByType(@PathVariable String type) {
        return boatService.getBoatByType(type);
    }
    @GetMapping(path = "/capacity/{capacity}")
    public List<Boat> getBoatByCapacity(@PathVariable Integer capacity) {
        return boatService.getBoatByCapacity(capacity);
    }
    @PostMapping
    public Boat createBoat(@RequestBody BoatModel boat) {
        return boatService.createBoat(boat);
    }
    @PutMapping(path = "/{id}")
    public Boat updateBoat(@PathVariable Integer id, @RequestBody BoatModel boat) {
        return boatService.updateBoat(id, boat);
    }
    @DeleteMapping(path ="/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteBoat(@PathVariable Integer id) {
        boatService.deleteBoat(id);
    }
}
