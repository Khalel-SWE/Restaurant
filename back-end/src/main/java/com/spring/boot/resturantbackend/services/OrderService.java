package com.spring.boot.resturantbackend.services;

import com.spring.boot.resturantbackend.controllers.vm.RequestOrderVm;
import com.spring.boot.resturantbackend.controllers.vm.ResponseOrderVm;
import com.spring.boot.resturantbackend.controllers.vm.UserOrdersResponse;

public interface OrderService {
    ResponseOrderVm requestOrder(RequestOrderVm requestOrderVm);

    UserOrdersResponse getOrders();

    // ضيف السطر ده هنا:
    boolean isUserProfileComplete(String username);
}
