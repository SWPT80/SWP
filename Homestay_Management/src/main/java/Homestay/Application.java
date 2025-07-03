//package Homestay;
//
//import Homestay.model.User;
//import Homestay.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//
//import java.util.List;
//
//@SpringBootApplication
//public class Application implements CommandLineRunner {
//
//    @Autowired
//    private UserService userService;
//
//    public static void main(String[] args) {
//        SpringApplication.run(Application.class, args);
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        // Gọi phương thức getAllUsersAndHosts và hiển thị dữ liệu
//        List<User> users = userService.getAdmins();
//        users.forEach(user -> System.out.println(user));
//    }
//}
