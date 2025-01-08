package matcha.project.be.DTO;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class TransactionDTO {
    private String username;
    private BigDecimal amount;
    private String type;
    private String transactionDate;
    private String status;
    private Integer id;
    private String recipient;

    public TransactionDTO(String username, String recipient, BigDecimal amount,String type,Timestamp transactionDate,String status, Integer id) {
        this.username = username;
        this.recipient = recipient;
        this.amount = amount;
        this.transactionDate = formatTimestamp(transactionDate);
        this.type = type;
        this.status = status;
        this.id = id;
    }


    private String formatTimestamp(Timestamp timestamp) {
        if (timestamp == null) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy 'at' hh:mm a");
        return sdf.format(new Date(timestamp.getTime()));
    }
}
