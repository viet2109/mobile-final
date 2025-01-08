package matcha.project.be.database.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import matcha.project.be.common.entity.SystemField;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Data
@Table(name = "t_card") // Table name for the card entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CardEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id") // Assuming you have a UserEntity
    private UserEntity user;

    @Column(name = "full_name", nullable = false) // Full name of the account holder
    private String fullName;

    @Column(name = "email", nullable = false) // Email associated with the card
    private String email;

    @Column(name = "card_number", nullable = false) // Card number
    private String cardNumber;

    @Column(name = "expiry_date", nullable = false) // Expiry date in MM/YY format
    private String expiryDate;

    @Column(name = "cvv", nullable = false) // CVV code
    private String cvv;

    @Embedded
    private SystemField systemField; // Assuming this contains common fields like created_at, updated_at, etc.
}