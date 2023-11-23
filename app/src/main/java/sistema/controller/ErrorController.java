package sistema.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ErrorController {

    @RequestMapping("/customError")
    public ResponseEntity<String> handleError() {
        return new ResponseEntity<>("Error handler executed", HttpStatus.OK);
    }
}