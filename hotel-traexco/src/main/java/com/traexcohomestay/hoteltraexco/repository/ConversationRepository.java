package com.traexcohomestay.hoteltraexco.repository;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Integer> {
    @Query("SELECT DISTINCT h.hostId FROM Booking b JOIN Homestay h ON b.homestayId = h.homestayId WHERE b.userId = :userId")
    List<Integer> findDistinctHostIdsByUserId(@Param("userId") int userId);
    List<Conversation> findByCustomer_IdAndHost_IdAndHomestay_HomestayId(int customerId, int hostId, int homestayId);
    @Query("SELECT DISTINCT m.sender FROM Message m WHERE m.conversation.host.id = :hostId")
    List<User> findUsersChattedWithHost(@Param("hostId") int hostId);
    List<Conversation> findAllByCustomer_IdAndHost_IdAndHomestay_HomestayId(int customerId, int hostId, int homestayId);
    @Query("SELECT DISTINCT b.homestay.host.id, b.homestay.homestayId, b.homestay.host.fullName " +
            "FROM Booking b WHERE b.user.id = :userId")
    List<Object[]> findHostAndHomestayByUserBooking(@Param("userId") int userId);

}