package matcha.project.be.database.entity;

import jakarta.persistence.*;
import lombok.Data;
import matcha.project.be.common.entity.SystemField;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;


@Entity
@Data
@Table(name = "t_account")
public class AccountEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;


    @Column(name = "account_number")
    private String accountNumber;




    @Enumerated(EnumType.STRING)
    @Column(name = "account_type")
    private  AccountType  accountType;


    @Column(name = "balance_timestamp")
    private BigDecimal balanceTimestamp;

    @Column(name = "currency")
    private String currency;

    @Embedded
    private SystemField systemField;



}
