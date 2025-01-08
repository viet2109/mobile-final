package matcha.project.be.service;

import lombok.RequiredArgsConstructor;
import matcha.project.be.DTO.TransactionDTO;
import matcha.project.be.DTO.TransferRequestDto;
import matcha.project.be.Repository.TransactionRepository;
import matcha.project.be.database.dao.AccountDao;
import matcha.project.be.database.entity.AccountEntity;
import matcha.project.be.database.entity.TransactionEntity;
import matcha.project.be.database.entity.TransactionStatus;
import matcha.project.be.database.entity.TransactionType;
import matcha.project.be.specification.TransactionSpecification;
import matcha.project.be.util.JwtUtil;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountDao accountDao;
    private final JwtUtil jwtUtil;

    public List<TransactionDTO> getTransactionsByAccountId(Integer accountId) {
        return transactionRepository.findTransactionsByAccountId(accountId);
    }

    public Page<TransactionEntity> findTransactions(Integer accountId, Pageable pageable) {
        Specification<TransactionEntity> spec = Specification
                .where(null);
        if (accountId != null) {
            spec = spec.and(TransactionSpecification.hasAccount(accountId));
        }

        return transactionRepository.findAll(spec, pageable);
    }
    public List<TransactionDTO> getTransactionsByType(TransactionType type, String token) {
        String email = jwtUtil.getEmailFromJwt(token.substring(7));
        List<TransactionDTO> transactions = transactionRepository.findByType(type, email);
        if (type == TransactionType.TRANSFER) {
            transactions = transactions.stream().filter(transactionDTO -> transactionDTO.getUsername().equals(email)).toList();
        } else if (type == TransactionType.RECEIVE) {
            transactions = transactions.stream().filter(transactionDTO -> transactionDTO.getRecipient().equals(email)).toList();
        }
        return transactions;
    }

    public TransactionEntity transfer(TransferRequestDto transferRequestDto) {
        // Tìm kiếm tài khoản người gửi và người nhận
        AccountEntity sender = accountDao.findByAccountNumber(transferRequestDto.getSender())
                .orElseThrow(() -> new EmptyResultDataAccessException("No account number found for sender", 1));
        AccountEntity recipient = accountDao.findByAccountNumber(transferRequestDto.getRecipient())
                .orElseThrow(() -> new EmptyResultDataAccessException("No account number found for recipient", 1));

        if (sender.getId().equals(recipient.getId())) {
            throw new IllegalArgumentException("Sender and recipient cannot be the same account");
        }
        // Kiểm tra số tiền chuyển
        if (transferRequestDto.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be greater than 0");
        }

        // Kiểm tra số dư tài khoản người gửi
        if (sender.getBalance().compareTo(transferRequestDto.getAmount()) < 0) {
            throw new IllegalArgumentException("Insufficient funds in sender's account");
        }

        // Cập nhật số dư tài khoản người gửi và người nhận
        sender.setBalance(sender.getBalance().subtract(transferRequestDto.getAmount()));  // Giảm số dư người gửi
        recipient.setBalance(recipient.getBalance().add(transferRequestDto.getAmount())); // Tăng số dư người nhận

        // Lưu thay đổi vào cơ sở dữ liệu
        accountDao.save(sender);
        accountDao.save(recipient);

        // Tạo giao dịch mới
        TransactionEntity transactionEntity = TransactionEntity.builder()
                .recipient(recipient)
                .account(sender)
                .amount(transferRequestDto.getAmount())
                .description(transferRequestDto.getDescription())
                .type(TransactionType.TRANSFER) // Giao dịch xuất tiền từ người gửi
                .status(TransactionStatus.PENDING)
                .build();

        TransactionEntity transactionEntityReceive = TransactionEntity.builder()
                .recipient(recipient)
                .account(sender)
                .amount(transferRequestDto.getAmount())
                .description(transferRequestDto.getDescription())
                .type(TransactionType.RECEIVE) // Giao dịch xuất tiền từ người gửi
                .status(TransactionStatus.PENDING)
                .build();

        // Lưu giao dịch vào cơ sở dữ liệu
        TransactionEntity savedTransaction = transactionRepository.save(transactionEntity);
        TransactionEntity savedTransactionReceive = transactionRepository.save(transactionEntityReceive);

        // Sau khi giao dịch hoàn thành, bạn có thể cập nhật lại trạng thái của giao dịch
        savedTransaction.setStatus(TransactionStatus.SUCCESS); // Giao dịch thành công
        savedTransactionReceive.setStatus(TransactionStatus.SUCCESS); // Giao dịch thành công

        transactionRepository.save(savedTransaction);

        // Trả về thông tin giao dịch
        return savedTransaction;
    }



}
