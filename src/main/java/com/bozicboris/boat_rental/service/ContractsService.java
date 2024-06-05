package com.bozicboris.boat_rental.service;

import com.bozicboris.boat_rental.entity.Boat;
import com.bozicboris.boat_rental.entity.Contracts;
import com.bozicboris.boat_rental.entity.User;
import com.bozicboris.boat_rental.model.BoatModel;
import com.bozicboris.boat_rental.model.ContractsModel;
import com.bozicboris.boat_rental.repository.BoatRepository;
import com.bozicboris.boat_rental.repository.ContractsRepository;
import com.bozicboris.boat_rental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContractsService {
    private final ContractsRepository contractsRepository;
    public List<Contracts> getAllContracts() {

        return contractsRepository.findAll();
    }
    public Optional<Contracts> getContractsById(Integer id) {
        return contractsRepository.findByIdAndDeletedAtIsNull(id);
    }

    public Optional<Contracts> getContractByUser(Integer user) {
        return contractsRepository.findByUserIdAndDeletedAtIsNull(user);
    }
    public Optional<Contracts> getContractByBoat(Integer boat) {
        return contractsRepository.findByBoatIdAndDeletedAtIsNull(boat);
    }
    public Contracts createContract(ContractsModel contractsModel) {
        Contracts contract = new Contracts();
        contract.setUser(contractsModel.getUser());
        contract.setBoat(contractsModel.getBoat());
        contract.setStartDate(contractsModel.getStartDate());
        contract.setEndDate(contractsModel.getEndDate());
        contract.setTotalCost(contractsModel.getTotalCost());
        contract.setRentalStatus(contractsModel.getRentalStatus());
        // Set any other fields you need from the contractsModel
        contract.setId(null);
        return contractsRepository.save(contract);
    }

    public Contracts updateContract(Integer id, ContractsModel contractsModel) {
        Contracts contract = contractsRepository.findByIdAndDeletedAtIsNull(id).orElseThrow();
        // Update the contract fields as needed from the contractsModel
        contract.setUser(contractsModel.getUser());
        contract.setBoat(contractsModel.getBoat());
        contract.setStartDate(contractsModel.getStartDate());
        contract.setEndDate(contractsModel.getEndDate());
        contract.setTotalCost(contractsModel.getTotalCost());
        contract.setRentalStatus(contractsModel.getRentalStatus());
        // Update any other fields you need from the contractsModel
        return contractsRepository.save(contract);
    }

    public void deleteContract(Integer id) {
        Contracts contract = contractsRepository.findByIdAndDeletedAtIsNull(id).orElseThrow();
        contract.setDeletedAt(LocalDateTime.now());
        contractsRepository.save(contract);
    }



}
