package matcha.project.be.database.dao;

import matcha.project.be.database.entity.AccountEntity;
import matcha.project.be.database.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface AccountDao extends CrudRepository<AccountEntity, Integer>, JpaSpecificationExecutor<AccountEntity> {
    Optional<AccountEntity> findByAccountNumber(String accountNumber);

    List<AccountEntity> findAllByUser(UserEntity user);
}
