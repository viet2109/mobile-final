package matcha.project.be.database.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;



@Entity
@Data
@Table(name = "t_transaction")
@NoArgsConstructor
@AllArgsConstructor
public class TransactionEntity  implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name="transaction_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private AccountEntity account;

    @Column(name="amount")
    private BigDecimal amount;
    @Column(name="description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name="type")
    private  TransactionType type;



    @Column(name="transaction_date")
    private Timestamp transactionDate;



    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private TransactionStatus status;


}
