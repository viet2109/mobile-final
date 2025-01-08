package matcha.project.be.controller;

import matcha.project.be.database.dao.CardDao;
import matcha.project.be.database.entity.CardEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardDao cardDao;

    @PostMapping("/add")
    public ResponseEntity<CardEntity> addCard(@RequestBody CardEntity cardEntity) {
        CardEntity savedCard = cardDao.save(cardEntity);
        return ResponseEntity.ok(savedCard);
    }

    @GetMapping
    public ResponseEntity<List<CardEntity>> getAllCards() {
        List<CardEntity> cards = cardDao.findAll();
        return ResponseEntity.ok(cards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CardEntity> getCardById(@PathVariable Integer id) {
        return cardDao.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}