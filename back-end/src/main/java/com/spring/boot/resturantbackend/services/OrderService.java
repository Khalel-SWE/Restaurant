package com.spring.boot.resturantbackend.services;

import com.spring.boot.resturantbackend.controllers.vm.RequestOrderVm;
import com.spring.boot.resturantbackend.controllers.vm.ResponseOrderVm;
import com.spring.boot.resturantbackend.controllers.vm.UserOrdersResponse;
import com.spring.boot.resturantbackend.dto.OrderDto;

import java.util.List;

public interface OrderService {
    ResponseOrderVm requestOrder(RequestOrderVm requestOrderVm);

    UserOrdersResponse getOrders();

    // ضيف السطر ده هنا:
    boolean isUserProfileComplete(String username);

    List<OrderDto> getAllOrdersForAdmin();

    void updateOrderStatus(Long orderId, String status);
}
