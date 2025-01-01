package matcha.project.be.util;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.Setter;
import matcha.project.be.database.entity.UserEntity;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Đoạn JWT_SECRET này là bí mật, chỉ có phía server biết
    private final String JWT_SECRET = "4509e1e738867146f0abda72624724a2dc84560753ffecfaf66bc35e50988f15";
    //Thời gian có hiệu lực của chuỗi jwt
    private final long JWT_EXPIRATION = 86400000L;

    @Setter
    @Getter
    private String jwt;

    // tạo ra jwt từ thông tin người dùng
    public String generateToken(UserEntity userEntity){
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        // tạo chuỗi json web token từ id của user
        jwt = Jwts.builder()
                .setSubject(userEntity.getEmail())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, getSignKey())
                .compact();
        return jwt;
    }
    // Lấy thông tin user từ jwt
    public String getEmailFromJwt(String token){
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (MalformedJwtException e) {
            throw new MalformedJwtException("Invalid token");
        }
    }
    public boolean validateToken(String authToken, UserEntity userEntity) {
        final String email = getEmailFromJwt(authToken);
        return email.equals(userEntity.getEmail());
    }

    public boolean validateTokenByEmail(String authToken, String e) {
        final String email = getEmailFromJwt(authToken);
        return email.equals(e);
    }

    private Key getSignKey(){
        byte[] keyBytes = Decoders.BASE64.decode(JWT_SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
