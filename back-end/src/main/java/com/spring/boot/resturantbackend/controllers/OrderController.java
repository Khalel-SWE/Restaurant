package com.spring.boot.resturantbackend.controllers;

import com.spring.boot.resturantbackend.controllers.vm.RequestOrderVm;
import com.spring.boot.resturantbackend.controllers.vm.ResponseOrderVm;
import com.spring.boot.resturantbackend.controllers.vm.UserOrdersResponse;
import com.spring.boot.resturantbackend.dto.ExceptionDto;
import com.spring.boot.resturantbackend.dto.OrderDto;
import com.spring.boot.resturantbackend.dto.security.AccountDto;
import com.spring.boot.resturantbackend.services.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    @PostMapping("/create-orders")
    public ResponseEntity<ResponseOrderVm> createOrder(@RequestBody @Valid RequestOrderVm requestOrderVm) {

        // 1. هنجيب الـ DTO من الـ SecurityContext مباشرة (ده أسرع وأدق)
        Object principal = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        if (!(principal instanceof AccountDto)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        AccountDto currentAccount = (AccountDto) principal;
        String username = currentAccount.getUsername();

        // 2. التحقق من اكتمال البروفايل
        if (!orderService.isUserProfileComplete(username)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseOrderVm("PROFILE_INCOMPLETE"));
        }

        // 3. التنفيذ
        return ResponseEntity.ok(orderService.requestOrder(requestOrderVm));
    }

    @GetMapping("/all-orders") // UserOrdersResponse
    public ResponseEntity<UserOrdersResponse> getAllOrders()  {
        return ResponseEntity.ok(orderService.getOrders());
    }

    @GetMapping("/admin/all-orders")
    public ResponseEntity<List<OrderDto>> getAllOrdersForAdmin() {

        return ResponseEntity.ok(
                orderService.getAllOrdersForAdmin()
        );
    }

    @PutMapping("/admin/update-status/{orderId}")
    public ResponseEntity<String> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String status
    ) {

        orderService.updateOrderStatus(orderId, status);

        return ResponseEntity.ok("Order status updated");

    }
}
