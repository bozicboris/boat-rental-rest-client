package com.bozicboris.boat_rental.controller;

import com.bozicboris.boat_rental.entity.Boat;
import com.bozicboris.boat_rental.entity.Contracts;
import com.bozicboris.boat_rental.entity.User;
import com.bozicboris.boat_rental.model.BoatModel;
import com.bozicboris.boat_rental.model.ContractsModel;
import com.bozicboris.boat_rental.service.ContractsService;
import com.bozicboris.boat_rental.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
@CrossOrigin
public class ContractsController {
    private final ContractsService contractsService;
    @GetMapping(path = "/{id}")
    public Optional<Contracts> getContractsById(@PathVariable Integer id) {
        return contractsService.getContractsById(id);
    }
    @GetMapping
    public List<Contracts> getAllContracts() {
        return contractsService.getAllContracts();
    }
    @GetMapping(path = "/user/{userId}")
    public Optional<Contracts> getContractByUser(@PathVariable Integer userId) {
        return contractsService.getContractByUser(userId);
    }
    @GetMapping(path = "/boat/{boatId}")
    public Optional<Contracts> getContractByBoat(@PathVariable Integer boatId) {
        return contractsService.getContractByBoat(boatId);
    }
    @PostMapping
    public Contracts createContracts(@RequestBody ContractsModel contractsModel) {
        return contractsService.createContract(contractsModel);
    }
    @PutMapping(path= "/{id}")
    public Contracts updateContracts(@PathVariable Integer id, @RequestBody ContractsModel contractsModel) { //this is supposed to edit by contracts id
        return contractsService.updateContract(id, contractsModel);
    }
    @DeleteMapping(path ="/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteContract(@PathVariable Integer id) { //this is supposed to delete by contracts id
        contractsService.deleteContract(id);
    }
}
