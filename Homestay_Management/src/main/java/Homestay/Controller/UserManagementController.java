package Homestay.Controller;

import Homestay.Model.User;
import Homestay.Service.UserManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserManagementController {

    @Autowired
    private UserManagement userService;

    @GetMapping
    public List<User> getAllUsersAndHosts() {
        return userService.getAllUsersAndHosts(); // Chỉ trả về user và host
    }

    @GetMapping("/hosts")
    public List<User> getHosts() {
        return userService.getHosts();
    }

    @GetMapping("/customers")
    public List<User> getCustomers() {
        return userService.getCustomers();
    }

    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam("keyword") String keyword) {
        if (keyword == null || keyword.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Keyword is required");
        }
        return userService.searchByKeyword(keyword);
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Integer id) {
        return userService.getById(id); // Tự kiểm tra role bên trong
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.create(user); // Chỉ tạo được user hoặc host
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Integer id, @RequestBody User user) {
        return userService.update(id, user); // Chỉ update user hoặc host
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        userService.delete(id); // Không cho xoá admin
    }
}

