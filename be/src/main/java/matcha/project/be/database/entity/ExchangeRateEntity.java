package matcha.project.be.database.entity;

import jakarta.persistence.*;
import lombok.Data;
import matcha.project.be.common.entity.SystemField;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Data
@Table(name = "t_exchange_rate")
public class ExchangeRateEntity implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "currency_from")
    private String currencyFrom;

    @Column(name = "currency_to")
    private String currencyTo;

    @Column(name = "rate")
    private Double rate;

    @Embedded
    SystemField systemField;
}
