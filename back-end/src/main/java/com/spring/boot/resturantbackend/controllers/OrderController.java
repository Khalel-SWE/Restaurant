package com.spring.boot.resturantbackend.controllers;

import com.spring.boot.resturantbackend.controllers.vm.RequestOrderVm;
import com.spring.boot.resturantbackend.controllers.vm.ResponseOrderVm;
import com.spring.boot.resturantbackend.controllers.vm.UserOrdersResponse;
import com.spring.boot.resturantbackend.dto.ExceptionDto;
import com.spring.boot.resturantbackend.services.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.SystemException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import java.net.URI;

@Tag(
        name = "Order Controller",
        description = "get all categories,create,get by id"
)
@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Operation(
            summary = "create category"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Http Status create category"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Http Status internal server error",
                    content = @Content(
                            schema = @Schema(implementation = ExceptionDto.class)
                    )
            ),
    })
//    @PostMapping("/create-orders")
//    public ResponseEntity<ResponseOrderVm> createOrder(@RequestBody @Valid RequestOrderVm requestOrderVm) throws SystemException {
//
//        // 1. هنجيب اليوزر الحالي (هنحتاج نستخدم الـ SecurityContextHolder)
//        // 2. هنشوف لو الـ accountDetails موجودة
//        // 3. لو مش موجودة هنرمي Exception برسالة "Please update your profile first"
//
//        return ResponseEntity.created(URI.create("create-orders")).body(orderService.requestOrder(requestOrderVm));
//    }

    @PostMapping("/create-orders")
    public ResponseEntity<ResponseOrderVm> createOrder(@RequestBody @Valid RequestOrderVm requestOrderVm) throws SystemException {

        // 1. هنجيب بيانات اليوزر اللي عامل Login حالياً من الـ Security Context
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();

        String username = auth.getName(); // ده اسم المستخدم (الإيميل أو الـ username)

        // 2. هنكلم السيرفيس تتأكد إذا كان اليوزر ده مكمل بياناته ولا لأ
        // الميثود دي هنضيفها في الـ OrderService حالاً
        if (!orderService.isUserProfileComplete(username)) {
            // 3. لو مش كاملة، ارمي الـ Exception اللي هيخلي الأنجولار يحوله لصفحة البروفايل
            throw new RuntimeException("Please update your profile first with address and phone number.");
        }

        return ResponseEntity.created(URI.create("create-orders")).body(orderService.requestOrder(requestOrderVm));
    }

    @GetMapping("/all-orders") // UserOrdersResponse
    public ResponseEntity<UserOrdersResponse> getAllOrders()  {
        return ResponseEntity.ok(orderService.getOrders());
    }
}
