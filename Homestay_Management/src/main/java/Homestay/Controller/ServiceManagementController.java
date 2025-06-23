package Homestay.Controller;

import Homestay.Model.HomestayService;
import Homestay.Service.HomestayServiceManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceManagementController {

    @Autowired
    private HomestayServiceManagement serviceService;

    @GetMapping
    public List<HomestayService> getAll() {
        return serviceService.getAll();
    }

    @GetMapping("/{id}")
    public HomestayService getById(@PathVariable Integer id) {
        return serviceService.getById(id);
    }

    @GetMapping("/type/{typeId}")
    public List<HomestayService> getByType(@PathVariable Integer typeId) {
        return serviceService.getByType(typeId);
    }

    @PostMapping
    public HomestayService create(@RequestBody HomestayService service) {
        return serviceService.create(service);
    }

    @PutMapping("/{id}")
    public HomestayService update(@PathVariable Integer id, @RequestBody HomestayService updated) {
        return serviceService.update(id, updated);
    }

    @GetMapping("/pending")
    public List<HomestayService> getPending() {
        return serviceService.getPendingServices();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        serviceService.delete(id);
    }
}
