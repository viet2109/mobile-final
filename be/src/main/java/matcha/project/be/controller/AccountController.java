package matcha.project.be.controller;

import lombok.RequiredArgsConstructor;
import matcha.project.be.database.entity.AccountEntity;
import matcha.project.be.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping()
    public ResponseEntity<List<AccountEntity>> findAccountsByUserId(@RequestParam(required = false) Integer userId,
                                                                    @RequestParam(required = false) String accountNumber,
                                                                    @RequestParam(required = false) String userName
    ) {

        return ResponseEntity.ok(accountService.findAccountsByQueries(userId, accountNumber, userName));
    }
}
