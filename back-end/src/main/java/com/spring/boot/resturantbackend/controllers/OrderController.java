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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
//    public ResponseEntity<ResponseOrderVm> createOrder(
//            @RequestBody @Valid RequestOrderVm requestOrderVm
//    ) throws SystemException {
//
//        // 1. نجيب المستخدم الحالي
//        org.springframework.security.core.Authentication auth =
//                org.springframework.security.core.context.SecurityContextHolder
//                        .getContext()
//                        .getAuthentication();
//
//        String username = auth.getName();
//
//        // 2. نتحقق من اكتمال البروفايل أولاً
//        if (!orderService.isUserProfileComplete(username)) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(new ResponseOrderVm("PROFILE_INCOMPLETE"));
//        }
//
//        // 3. لو كل شيء تمام → ننشئ الطلب
//        ResponseOrderVm response = orderService.requestOrder(requestOrderVm);
//
//        return ResponseEntity.ok(response);
//    }

    @PostMapping("/create-orders")
    public ResponseEntity<ResponseOrderVm> createOrder(@RequestBody @Valid RequestOrderVm requestOrderVm) throws SystemException {

        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();

        // السطر ده هو التعديل الأهم:
        String username;
        if (auth.getPrincipal() instanceof com.spring.boot.resturantbackend.dto.security.AccountDto) {
            username = ((com.spring.boot.resturantbackend.dto.security.AccountDto) auth.getPrincipal()).getUsername();
        } else {
            username = auth.getName();
        }

        if (!orderService.isUserProfileComplete(username)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseOrderVm("PROFILE_INCOMPLETE"));
        }

        return ResponseEntity.ok(orderService.requestOrder(requestOrderVm));
    }

    @GetMapping("/all-orders") // UserOrdersResponse
    public ResponseEntity<UserOrdersResponse> getAllOrders()  {
        return ResponseEntity.ok(orderService.getOrders());
    }
}
