package com.respository;

import com.entity.Conversation;
import com.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Integer> {
    @Query("SELECT DISTINCT h.hostId FROM Booking b JOIN Homestays h ON b.homestayId = h.homestayId WHERE b.userId = :userId")
    List<Integer> findDistinctHostIdsByUserId(@Param("userId") int userId);
    Optional<Conversation> findByCustomer_IdAndHost_IdAndHomestay_HomestayId(int customerId, int hostId, int homestayId);
    @Query("SELECT DISTINCT m.sender FROM Message m WHERE m.conversation.host.id = :hostId")
    List<Users> findUsersChattedWithHost(@Param("hostId") int hostId);

}


