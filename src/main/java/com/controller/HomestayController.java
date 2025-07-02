package com.controller;

import com.entity.Homestays;
import com.respository.HomestayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/homestays")
@CrossOrigin(origins = "*")
public class HomestayController {

    @Autowired
    private HomestayRepository homestayRepository;

    @GetMapping("/by-host/{hostId}")
    public ResponseEntity<List<Homestays>> getHomestaysByHost(@PathVariable int hostId) {
        List<Homestays> homestays = homestayRepository.findByHostId(hostId);
        if (homestays.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(homestays);
    }
}
