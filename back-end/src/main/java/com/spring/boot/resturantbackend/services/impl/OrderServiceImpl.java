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
import com.spring.boot.resturantbackend.models.security.Account;
import com.spring.boot.resturantbackend.repositories.OrderRepo;
import com.spring.boot.resturantbackend.repositories.security.AccountRepo;
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
//        // بنغير findByEmail لـ findByUsername
//        return accountRepo.findByUsername(username)
//                .map(account -> account.getAccountDetails() != null
//                        && account.getAccountDetails().getAddress() != null
//                        && !account.getAccountDetails().getAddress().isEmpty())
//                .orElse(false);
//    }

    public boolean isUserProfileComplete(String username) {
        // 1. هنجيب الحساب عن طريق الـ username
        Account account = accountRepo.findByUsername(username)
                .orElse(null); // ولو رجع null الـ if اللي بعدها هتتعامل

        // 2. التحقق: لو ملوش AccountDetails (يعني الـ Field ده NULL في الـ Entity)
        // أو لو كانت البيانات اللي جواه (العنوان أو التليفون) فاضية
        if (account.getAccountDetails() == null) {
            return false;
        }

        // زيادة تأكيد: نتحقق إن الحقول الجوهرية مش فاضية
        return account.getAccountDetails().getAddress() != null &&
                !account.getAccountDetails().getAddress().isEmpty() &&
                account.getAccountDetails().getPhoneNumber() != null;
    }

    @Override
    public ResponseOrderVm requestOrder(RequestOrderVm requestOrderVm) {

        // 1. نجيب المنتجات
        List<ProductDto> productDtoList = productService.getProductByIds(requestOrderVm.getProductsIds());

        // 2. نجيب المستخدم الحالي
        AccountDto accountDto = (AccountDto) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        // 3. نعمل Order
        Order order = new Order();

        //  نحط كود مؤقت (مهم جداً عشان الداتابيز)
        order.setCode("TEMP");

        order.setTotalPrice(requestOrderVm.getTotalPrice());
        order.setTotalNumber(requestOrderVm.getTotalNumber());
        order.setProducts(ProductMapper.PRODUCT_MAPPER.toProductList(productDtoList));
        order.setAccount(AccountMapper.ACCOUNT_MAPPER.toAccount(accountDto));

        // 4. نحفظ أول مرة
        Order orderSaved = orderRepo.save(order);

        // 5. نولّد الكود الحقيقي باستخدام ID
        orderSaved.setCode("RES-" + orderSaved.getId());

        // 6. نحفظ مرة ثانية
        orderSaved = orderRepo.save(orderSaved);

        // 7. نرجّع response
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
