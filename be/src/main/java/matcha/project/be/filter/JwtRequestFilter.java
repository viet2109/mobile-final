package matcha.project.be.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import matcha.project.be.database.entity.UserEntity;
import matcha.project.be.service.UserService;
import matcha.project.be.util.JwtUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        if (!request.getRequestURI().contains("/auth")) {
            String header = request.getHeader("Authorization");
            String token = null;
            String email = null;

            if (header != null && header.startsWith("Bearer ")) {
                token = header.substring(7);
            }

            if (token != null) {
                email = jwtUtil.getEmailFromJwt(token);
                jwtUtil.setJwt(token);
            }

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserEntity userEntity = this.userService.getUserByEmail(email);
                List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
                if (jwtUtil.validateToken(token, userEntity)) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                            userEntity, null, authorities
                    );
                    usernamePasswordAuthenticationToken
                            .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    logger.info(SecurityContextHolder.getContext().getAuthentication().getAuthorities());
                }
            }

        }
        chain.doFilter(request, response);
    }
}
