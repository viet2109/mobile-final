package matcha.project.be.specification;

import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
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

    public static Specification<TransactionEntity> distinctByRecipient() {
        return (root, query, criteriaBuilder) -> {
            // Xác định nếu query chính chưa có nhóm
            query.distinct(true);

            // Tạo Subquery để tìm transactionDate mới nhất cho mỗi recipient
            Subquery<Timestamp> subquery = query.subquery(Timestamp.class);
            Root<TransactionEntity> subRoot = subquery.from(TransactionEntity.class);

            // Đảm bảo subRoot.get("transactionDate") là kiểu Expression<Timestamp>
            Expression<Timestamp> transactionDateExpression = subRoot.get("transactionDate");

            // Subquery lấy transactionDate mới nhất theo recipient
            subquery.select(criteriaBuilder.greatest(transactionDateExpression))
                    .where(criteriaBuilder.equal(subRoot.get("recipient"), root.get("recipient")));

            // Điều kiện: chỉ giữ lại giao dịch với transactionDate khớp Subquery
            return criteriaBuilder.equal(root.get("transactionDate"), subquery);
        };
    }


    public static Specification<TransactionEntity> hasAmountGreaterThan(BigDecimal amount) {
        return (root, query, criteriaBuilder) -> {
            if (amount == null) return null;
            return criteriaBuilder.greaterThanOrEqualTo(root.get("amount"), amount);
        };
    }
}
