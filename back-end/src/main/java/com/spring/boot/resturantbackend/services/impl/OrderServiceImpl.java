//package com.spring.boot.resturantbackend.services.impl;
//
//import com.spring.boot.resturantbackend.controllers.vm.RequestOrderVm;
//import com.spring.boot.resturantbackend.controllers.vm.ResponseOrderVm;
//import com.spring.boot.resturantbackend.controllers.vm.UserOrdersResponse;
//import com.spring.boot.resturantbackend.dto.OrderDto;
//import com.spring.boot.resturantbackend.dto.ProductDto;
//import com.spring.boot.resturantbackend.dto.security.AccountDto;
//import com.spring.boot.resturantbackend.mappers.OrderMapper;
//import com.spring.boot.resturantbackend.mappers.ProductMapper;
//import com.spring.boot.resturantbackend.mappers.security.AccountMapper;
//import com.spring.boot.resturantbackend.models.Order;
//import com.spring.boot.resturantbackend.repositories.OrderRepo;
//import com.spring.boot.resturantbackend.services.OrderService;
//import com.spring.boot.resturantbackend.services.ProductService;
//import jakarta.transaction.SystemException;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.PostMapping;
//
//import java.net.URI;
//import java.util.List;
//import java.util.Objects;
//
//@Service
//public class OrderServiceImpl implements OrderService {
//    @Autowired
//    private OrderRepo orderRepo;
//
//    @Autowired
//    private ProductService productService;
//
//    @Override
//    public ResponseOrderVm requestOrder(RequestOrderVm requestOrderVm) {
//
//        // 1.جيب المنتجات
//        List<ProductDto> productDtoList = productService.getProductByIds(requestOrderVm.getProductsIds());
//
//        // 2. جيب بيانات اليوزر اللي عامل Login
//        AccountDto accountDto = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//
//
//        // 3. الحارس (التشيك الجديد)
//        if (Objects.isNull(accountDto.getAccountDetails())) {
//            throw new RuntimeException("Please update your profile details (Address, Phone, etc.) before ordering.");
//        }
//
//        Order order = new Order();
//        order.setTotalPrice(requestOrderVm.getTotalPrice());
//        order.setTotalNumber(requestOrderVm.getTotalNumber());
//        order.setProducts(ProductMapper.PRODUCT_MAPPER.toProductList(productDtoList));
//        order.setAccount(AccountMapper.ACCOUNT_MAPPER.toAccount(accountDto));
//
//        Order orderSaved = orderRepo.save(order);
//
//        Long id = orderSaved.getId();
//        String code = "RES-" + id;
//        orderSaved.setCode(code);
//
//        orderSaved = orderRepo.save(order);
//
//        return new ResponseOrderVm(orderSaved.getCode(), orderSaved.getTotalPrice(), orderSaved.getTotalNumber());
//    }
//
//    @Override
//    public UserOrdersResponse getOrders() {
//        AccountDto accountDto = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//
//        List<Order> orders =  orderRepo.findByAccountId(accountDto.getId());
//
//        List<OrderDto> orderDtos =  OrderMapper.ORDER_MAPPER.toOrderDtoList(orders);
//
//        double totalPrice = orderDtos.stream()
//                .mapToDouble(OrderDto::getTotalPrice)
//                .sum();
//
//        return new UserOrdersResponse(
//                orderDtos,
//                orderDtos.size(),
//                totalPrice
//        );
//    }
//
//    @PostMapping("/create-orders")
//    public ResponseEntity<ResponseOrderVm> createOrder(@RequestBody @Valid RequestOrderVm requestOrderVm) throws SystemException {
//
//        // 1. هنجيب بيانات اليوزر اللي عامل Login حالياً من الـ Security Context
//        org.springframework.security.core.Authentication auth =
//                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
//
//        String username = auth.getName(); // ده اسم المستخدم (الإيميل أو الـ username)
//
//        // 2. هنكلم السيرفيس تتأكد إذا كان اليوزر ده مكمل بياناته ولا لأ
//        // الميثود دي هنضيفها في الـ OrderService حالاً
//        if (!orderService.isUserProfileComplete(username)) {
//            // 3. لو مش كاملة، ارمي الـ Exception اللي هيخلي الأنجولار يحوله لصفحة البروفايل
//            throw new RuntimeException("Please update your profile first with address and phone number.");
//        }
//
//        return ResponseEntity.created(URI.create("create-orders")).body(orderService.requestOrder(requestOrderVm));
//    }
//
//}
package com.spring.boot.resturantbackend.services.impl;

import com.spring.boot.resturantbackend.controllers.vm.RequestOrderVm;
import com.spring.boot.resturantbackend.controllers.vm.ResponseOrderVm;
import com.spring.boot.resturantbackend.controllers.vm.UserOrdersResponse;
import com.spring.boot.resturantbackend.dto.OrderDto;
import com.spring.boot.resturantbackend.dto.ProductDto;
import com.spring.boot.resturantbackend.dto.security.AccountDto;
import com.spring.boot.resturantbackend.mappers.OrderMapper;
import com.spring.boot.resturantbackend.mappers.ProductMapper;
import com.spring.boot.resturantbackend.mappers.security.AccountMapper;
import com.spring.boot.resturantbackend.models.Order;
import com.spring.boot.resturantbackend.repositories.OrderRepo;
import com.spring.boot.resturantbackend.repositories.security.AccountRepo; // تأكد من وجود الـ Repo ده
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
    private AccountRepo accountRepo; // محتاجينه عشان نشيك على الداتا بيز

    @Autowired
    private ProductService productService;

//    @Override
//    public boolean isUserProfileComplete(String username) {
//        // بنروح للداتا بيز نشوف اليوزر ده مكمل بياناته ولا لأ
//        return accountRepo.findByEmail(username)
//                .map(account -> account.getAccountDetails() != null
//                        && account.getAccountDetails().getAddress() != null
//                        && !account.getAccountDetails().getAddress().isEmpty())
//                .orElse(false);
//    }

    @Override
    public boolean isUserProfileComplete(String username) {
        // بنغير findByEmail لـ findByUsername
        return accountRepo.findByUsername(username)
                .map(account -> account.getAccountDetails() != null
                        && account.getAccountDetails().getAddress() != null
                        && !account.getAccountDetails().getAddress().isEmpty())
                .orElse(false);
    }

    @Override
    public ResponseOrderVm requestOrder(RequestOrderVm requestOrderVm) {
        List<ProductDto> productDtoList = productService.getProductByIds(requestOrderVm.getProductsIds());
        AccountDto accountDto = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Order order = new Order();
        order.setTotalPrice(requestOrderVm.getTotalPrice());
        order.setTotalNumber(requestOrderVm.getTotalNumber());
        order.setProducts(ProductMapper.PRODUCT_MAPPER.toProductList(productDtoList));
        order.setAccount(AccountMapper.ACCOUNT_MAPPER.toAccount(accountDto));

        Order orderSaved = orderRepo.save(order);
        orderSaved.setCode("RES-" + orderSaved.getId());
        orderSaved = orderRepo.save(orderSaved);

        return new ResponseOrderVm(orderSaved.getCode(), orderSaved.getTotalPrice(), orderSaved.getTotalNumber());
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
