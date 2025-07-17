package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.RoomDTO;
import com.traexcohomestay.hoteltraexco.dto.RoomDetailsDTO;
import com.traexcohomestay.hoteltraexco.dto.request.RoomCreateRequest;
import com.traexcohomestay.hoteltraexco.dto.request.RoomUpdateRequest;
import com.traexcohomestay.hoteltraexco.dto.response.RoomResponseWithImages;
import com.traexcohomestay.hoteltraexco.model.Room;


import java.util.List;

public interface RoomService {
    // API hiện có từ câu hỏi trước
    RoomDetailsDTO getRoomDetails(Integer homestayId, String roomNumber);
    // API mới để lấy danh sách phòng của homestay
    List<RoomDTO> getRoomsByHomestayId(Integer homestayId);
    RoomDTO createRoom(RoomCreateRequest request);
    List<RoomResponseWithImages> getRoomsByHostId(Integer hostId);
    Room getRoomById(int homestayId, String roomId);
    Room updateRoom(int homestayId, String roomId, RoomUpdateRequest request);
    void deleteRoom(int homestayId, String roomId);
}