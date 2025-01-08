package matcha.project.be.controller;

import lombok.RequiredArgsConstructor;
import matcha.project.be.DTO.TransactionDTO;
import matcha.project.be.DTO.TransferRequestDto;
import matcha.project.be.database.entity.TransactionEntity;
import matcha.project.be.database.entity.TransactionType;
import matcha.project.be.service.TransactionService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;


    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<TransactionDTO>> getTransactionsByAccountId(@PathVariable Integer accountId) {
        List<TransactionDTO> transactions = transactionService.getTransactionsByAccountId(accountId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping()
    public List<TransactionEntity> getTransactions(
            @RequestParam(required = false) Integer accountId,
            @RequestParam(defaultValue = "transactionDate,desc") String[] sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {

        // Tạo Sort object dựa trên tham số sortBy và sortDirection
        List<Sort.Order> orders = new ArrayList<>();
        if (sort[0].contains(",")) {
            for (String sortOrder : sort) {
                String[] _sort = sortOrder.split(",");
                orders.add(new Sort.Order(getSortDirection(_sort[1]), _sort[0]));
            }
        } else {
            orders.add(new Sort.Order(getSortDirection(sort[1]), sort[0]));
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by(orders));

        return transactionService.findTransactions(accountId, pageable).getContent().stream().distinct().toList();
    }

    private Sort.Direction getSortDirection(String direction) {
        if (direction.equalsIgnoreCase("desc")) {
            return Sort.Direction.DESC;
        }
        return Sort.Direction.ASC;
    }

    @PostMapping("/send")
    public ResponseEntity<?> transfer(@RequestBody TransferRequestDto transferRequestDto) {
        return ResponseEntity.ok(transactionService.transfer(transferRequestDto));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<TransactionDTO>> getTransactionsByType(@PathVariable TransactionType type, @RequestHeader("Authorization") String token){
        List<TransactionDTO> transactions = transactionService.getTransactionsByType(type, token);
        return ResponseEntity.ok(transactions);
    }
}
