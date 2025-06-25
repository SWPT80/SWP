package Homestay.service;

import Homestay.model.HomestayService;
import Homestay.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomestayServiceManagement {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<HomestayService> getAll() {
        return serviceRepository.findAll();
    }

    public HomestayService getById(Integer id) {
        return serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found"));
    }

    public List<HomestayService> getByType(Integer typeId) {
        return serviceRepository.findByType_TypeId(typeId);
    }

    public HomestayService create(HomestayService service) {
        return serviceRepository.save(service);
    }

    public HomestayService update(Integer id, HomestayService updated) {
        HomestayService existing = getById(id);
        existing.setHomestay(updated.getHomestay());
        existing.setType(updated.getType());
        existing.setPrice(updated.getPrice());
        existing.setStatus(updated.getStatus());
        existing.setSpecialNotes(updated.getSpecialNotes());
        return serviceRepository.save(existing);
    }

    public List<HomestayService> getPendingServices() {
        return serviceRepository.findByStatus(false); // status = false: chưa duyệt
    }

    public void delete(Integer id) {
        serviceRepository.deleteById(id);
    }
}

