package matcha.project.be.controller;

import lombok.RequiredArgsConstructor;
import matcha.project.be.service.CountryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/country")
@RequiredArgsConstructor
public class CountryController {
    private final CountryService countryService;

    @GetMapping("/pull-down")
    public ResponseEntity<Object> getPullDownList() {
        return ResponseEntity.ok(countryService.getPullDownList());
    }
}
