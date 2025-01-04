package matcha.project.be.database.entity;

import jakarta.persistence.*;
import lombok.Data;
import matcha.project.be.common.entity.SystemField;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Data
@Table(name = "t_code_verify")
public class CodeVerifyEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "email")
    private String email;

    @Column(name = "code")
    private String code;

    @Embedded
    private SystemField systemField;
}
