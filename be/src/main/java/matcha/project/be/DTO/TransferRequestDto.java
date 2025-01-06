package matcha.project.be.DTO;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class TransferRequestDto {
    private String sender;
    private String recipient;
    private BigDecimal amount;
    private String type;
    private String description;
}
