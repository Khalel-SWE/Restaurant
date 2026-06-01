package com.spring.boot.resturantbackend.services.impl;

import com.spring.boot.resturantbackend.controllers.vm.RequestOrderVm;
import com.spring.boot.resturantbackend.controllers.vm.ResponseOrderVm;
import com.spring.boot.resturantbackend.controllers.vm.UserOrdersResponse;
import com.spring.boot.resturantbackend.dto.OrderDto;
import com.spring.boot.resturantbackend.dto.ProductDto;
import com.spring.boot.resturantbackend.dto.security.AccountDto;
import com.spring.boot.resturantbackend.mappers.OrderMapper;
import com.spring.boot.resturantbackend.mappers.ProductMapper;
import com.spring.boot.resturantbackend.models.Order;
import com.spring.boot.resturantbackend.models.security.Account;
import com.spring.boot.resturantbackend.repositories.OrderRepo;
import com.spring.boot.resturantbackend.repositories.security.AccountRepo;
import com.spring.boot.resturantbackend.services.NotificationService;
import com.spring.boot.resturantbackend.services.OrderService;
import com.spring.boot.resturantbackend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private ProductService productService;

    @Autowired
    private NotificationService notificationService;

    public boolean isUserProfileComplete(String username) {

        return accountRepo.findByUsername(username).map(account -> {

            if (account.getAccountDetails() == null) return false;

            String address = account.getAccountDetails().getAddress();
            String phone = account.getAccountDetails().getPhoneNumber();

            return address != null && !address.trim().isEmpty() &&
                    phone != null && !phone.trim().isEmpty();
        }).orElse(false);
    }

    @Override
    public List<OrderDto> getAllOrdersForAdmin() {
        List<Order> orders = orderRepo.findAll();

        return OrderMapper.ORDER_MAPPER.toOrderDtoList(orders);
    }

    @Override
    public void updateOrderStatus(Long orderId, String status) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow();

        if (
                order.getStatus() != null &&
                        (
                                order.getStatus().equals("DELIVERED") ||
                                        order.getStatus().equals("CANCELLED")
                        )
        ) {

            throw new RuntimeException(
                    "Order status cannot be changed anymore"
            );

        }

        order.setStatus(status);

        orderRepo.save(order);

        notificationService.createNotification(
                order.getAccount().getId(),
                "Your order status is now: " + status,
                "ORDER_STATUS"
        );

    }


    @Override
    public ResponseOrderVm requestOrder(RequestOrderVm requestOrderVm) {

        List<ProductDto> productDtoList = productService.getProductByIds(requestOrderVm.getProductsIds());

        AccountDto accountDto = (AccountDto) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        Order order = new Order();

        order.setCode("TEMP-" + System.currentTimeMillis());

        order.setTotalPrice(requestOrderVm.getTotalPrice());
        order.setTotalNumber(requestOrderVm.getTotalNumber());
        order.setProducts(ProductMapper.PRODUCT_MAPPER.toProductList(productDtoList));

        Account account = new Account();
        account.setId(accountDto.getId());
        order.setAccount(account);

        Order orderSaved = orderRepo.save(order);

        orderSaved.setCode("RES-" + orderSaved.getId());

        orderSaved = orderRepo.save(orderSaved);

        notificationService.createNotification(
                account.getId(),
                "Your order has been created successfully",
                "ORDER"
        );

// notification للادمن
        notificationService.createNotification(
                1L,
                "New order received",
                "NEW_ORDER"
        );

        return new ResponseOrderVm(
                orderSaved.getCode(),
                orderSaved.getTotalPrice(),
                orderSaved.getTotalNumber(),
                "SUCCESS"
        );
    }

    @Override
    public UserOrdersResponse getOrders() {
        AccountDto accountDto = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Order> orders = orderRepo.findByAccountId(accountDto.getId());
        List<OrderDto> orderDtos = OrderMapper.ORDER_MAPPER.toOrderDtoList(orders);

        double totalPrice = orderDtos.stream().mapToDouble(OrderDto::getTotalPrice).sum();
        return new UserOrdersResponse(orderDtos, orderDtos.size(), totalPrice);
    }
}
