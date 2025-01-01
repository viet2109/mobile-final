package matcha.project.be.service;

import matcha.project.be.DTO.TransactionDTO;
import matcha.project.be.Repository.TransactionRepository;
import matcha.project.be.database.entity.TransactionEntity;
import matcha.project.be.database.entity.TransactionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;


    public List<TransactionDTO> getTransactionsByAccountId(Integer accountId) {
        return transactionRepository.findTransactionsByAccountId(accountId);
    }



    public List<TransactionDTO> getTransactionsByType(TransactionType type) {
        return transactionRepository.findByType(type);
    }


}
