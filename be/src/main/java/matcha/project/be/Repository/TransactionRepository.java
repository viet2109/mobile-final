package matcha.project.be.Repository;

import matcha.project.be.DTO.TransactionDTO;
import matcha.project.be.database.entity.TransactionEntity;
import matcha.project.be.database.entity.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Integer>, JpaSpecificationExecutor<TransactionEntity> {
    @Query("SELECT new matcha.project.be.DTO.TransactionDTO(t.account.user.email, t.recipient.user.email, t.amount,CAST(t.type AS string) , t.transactionDate,CAST(t.status AS string), t.id)  " +
            "FROM TransactionEntity t " +
            "JOIN t.account a " +
            "JOIN a.user u " +
            "WHERE t.account.id = :accountId AND t.status = 'SUCCESS'")
    List<TransactionDTO> findTransactionsByAccountId(Integer accountId);


    @Query("SELECT new matcha.project.be.DTO.TransactionDTO(t.account.user.email, t.recipient.user.email, t.amount, CAST(t.type AS string), t.transactionDate, CAST(t.status AS string), t.id) " +
            "FROM TransactionEntity t " +
            "JOIN t.account a " +
            "JOIN a.user u " +
            "WHERE t.type = :type AND t.status = 'SUCCESS' AND (t.account.user.email = :email OR t.recipient.user.email = :email)")
    List<TransactionDTO> findByType(@Param("type") TransactionType type, @Param("email") String email);
}
