package matcha.project.be.specification;

import matcha.project.be.database.entity.TransactionEntity;
import matcha.project.be.database.entity.TransactionStatus;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class TransactionSpecification {

    public static Specification<TransactionEntity> hasAccount(Integer accountId) {
        return (root, query, criteriaBuilder) -> {
            if (accountId == null) return null;
            return criteriaBuilder.equal(root.get("account").get("id"), accountId);
        };
    }

    public static Specification<TransactionEntity> hasRecipient(Integer recipientId) {
        return (root, query, criteriaBuilder) -> {
            if (recipientId == null) return null;
            return criteriaBuilder.equal(root.get("recipient").get("id"), recipientId);
        };
    }

    public static Specification<TransactionEntity> hasStatus(TransactionStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null) return null;
            return criteriaBuilder.equal(root.get("status"), status);
        };
    }

    public static Specification<TransactionEntity> transactionDateBetween(Timestamp startDate, Timestamp endDate) {
        return (root, query, criteriaBuilder) -> {
            if (startDate == null && endDate == null) return null;
            if (startDate != null && endDate != null) {
                return criteriaBuilder.between(root.get("transactionDate"), startDate, endDate);
            } else if (startDate != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("transactionDate"), startDate);
            } else {
                return criteriaBuilder.lessThanOrEqualTo(root.get("transactionDate"), endDate);
            }
        };
    }

    public static Specification<TransactionEntity> hasAmountGreaterThan(BigDecimal amount) {
        return (root, query, criteriaBuilder) -> {
            if (amount == null) return null;
            return criteriaBuilder.greaterThanOrEqualTo(root.get("amount"), amount);
        };
    }
}
