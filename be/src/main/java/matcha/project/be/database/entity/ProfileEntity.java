package matcha.project.be.database.entity;

import jakarta.persistence.*;
import lombok.Data;
import matcha.project.be.common.entity.SystemField;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "t_profile")
public class ProfileEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name = "country_id")
    private Integer countryId;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "birth_date")
    private LocalDateTime birthDate;

    @Column(name = "email")
    private String email;

    @Column(name = "city")
    private String city;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "address_line")
    private String addressLine;

    @Embedded
    private SystemField systemField;
}
