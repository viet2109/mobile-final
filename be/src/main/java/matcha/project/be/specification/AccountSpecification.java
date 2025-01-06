package matcha.project.be.specification;

import matcha.project.be.database.entity.AccountEntity;
import matcha.project.be.database.entity.AccountType;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;

public class AccountSpecification {

    // Lọc theo loại tài khoản
    public static Specification<AccountEntity> hasAccountType(AccountType accountType) {
        return (root, query, criteriaBuilder) -> {
            if (accountType == null) {
                return null; // Không có điều kiện
            }
            return criteriaBuilder.equal(root.get("accountType"), accountType);
        };
    }

    // Lọc theo số dư lớn hơn một giá trị nhất định
    public static Specification<AccountEntity> hasBalanceGreaterThan(BigDecimal minBalance) {
        return (root, query, criteriaBuilder) -> {
            if (minBalance == null) {
                return null; // Không có điều kiện
            }
            return criteriaBuilder.greaterThanOrEqualTo(root.get("balanceTimestamp"), minBalance);
        };
    }

    // Lọc theo loại tiền tệ
    public static Specification<AccountEntity> hasCurrency(String currency) {
        return (root, query, criteriaBuilder) -> {
            if (!StringUtils.hasText(currency)) {
                return null; // Không có điều kiện
            }
            return criteriaBuilder.equal(root.get("currency"), currency);
        };
    }

    // Lọc theo ID người dùng
    public static Specification<AccountEntity> belongsToUser(Integer userId) {
        return (root, query, criteriaBuilder) -> {
            if (userId == null) {
                return null; // Không có điều kiện
            }
            return criteriaBuilder.equal(root.get("user").get("id"), userId);
        };
    }

    public static Specification<AccountEntity> belongsToUserName(String userName) {
        return (root, query, criteriaBuilder) -> {
            if (!StringUtils.hasText(userName)) {
                return null; // Không có điều kiện
            }
            System.out.println(root.get("user").get("username"));
            return criteriaBuilder.equal(root.get("user").get("username"), userName);
        };
    }

    public static Specification<AccountEntity> hasAccountNumber(String accountNumber) {
        return (root, query, criteriaBuilder) -> {
            if (!StringUtils.hasText(accountNumber)) {
                return null; // Không có điều kiện
            }
            return criteriaBuilder.equal(root.get("accountNumber"), accountNumber);
        };
    }

}

