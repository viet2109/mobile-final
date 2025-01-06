package matcha.project.be.service;

import lombok.RequiredArgsConstructor;
import matcha.project.be.database.dao.AccountDao;
import matcha.project.be.database.dao.UserDao;
import matcha.project.be.database.entity.AccountEntity;
import matcha.project.be.database.entity.UserEntity;
import matcha.project.be.specification.AccountSpecification;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountDao accountDao;
    private final UserDao userDao;
    public List<AccountEntity> findAccountsByQueries(Integer userId, String accountNumber, String userName) {
        Specification<AccountEntity> spec = Specification.where(null);
        if (userId != null) {
            spec = spec.or(AccountSpecification.belongsToUser(userId));
        }
        if (accountNumber != null && !accountNumber.isEmpty()) {
            spec = spec.or(AccountSpecification.hasAccountNumber(accountNumber));
        }
        if (userName != null && !userName.isEmpty()) {
            spec = spec.or(AccountSpecification.belongsToUserName(userName));
        }

        return  accountDao.findAll(spec);
    }
}
