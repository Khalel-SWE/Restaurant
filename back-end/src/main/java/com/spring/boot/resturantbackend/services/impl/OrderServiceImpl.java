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
    private AccountRepo accountRepo; // محتاجينه عشان نشيك على الداتا بيز

    @Autowired
    private ProductService productService;

    @Autowired
    private NotificationService notificationService;

    public boolean isUserProfileComplete(String username) {
        // استخدم Optional عشان نتجنب الـ Exception المفاجئ
        return accountRepo.findByUsername(username).map(account -> {
            // التحقق من وجود Details ومن إن الحقول الأساسية مش فاضية
            if (account.getAccountDetails() == null) return false;

            String address = account.getAccountDetails().getAddress();
            String phone = account.getAccountDetails().getPhoneNumber();

            return address != null && !address.trim().isEmpty() &&
                    phone != null && !phone.trim().isEmpty();
        }).orElse(false); // لو اليوزر مش موجود أصلاً نرجع false
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

        order.setStatus(status);

        orderRepo.save(order);

    }


    @Override
    public ResponseOrderVm requestOrder(RequestOrderVm requestOrderVm) {

        // 1. نجيب المنتجات بناءً على الـ IDs المبعوثة من الفرونت إند
        List<ProductDto> productDtoList = productService.getProductByIds(requestOrderVm.getProductsIds());

        // 2. نجيب بيانات المستخدم الحالي من الـ Security Context
        // تأكدنا إننا بنعمل Cast لـ AccountDto اللي متخزن وقت الـ Login
        AccountDto accountDto = (AccountDto) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        // 3. إنشاء كائن الـ Order الجديد
        Order order = new Order();

        // 4. توليد كود مؤقت فريد (استخدمنا الوقت الحالي بالملي ثانية لضمان عدم التكرار قبل الحفظ)
        order.setCode("TEMP-" + System.currentTimeMillis());

        // 5. ضبط البيانات الأساسية (السعر، العدد، المنتجات)
        order.setTotalPrice(requestOrderVm.getTotalPrice());
        order.setTotalNumber(requestOrderVm.getTotalNumber());
        order.setProducts(ProductMapper.PRODUCT_MAPPER.toProductList(productDtoList));

        // 6. ربط الأوردر بالمستخدم (طريقة احترافية: ننشئ كائن Account بـ ID فقط للربط)
        Account account = new Account();
        account.setId(accountDto.getId());
        order.setAccount(account);

        // 7. الحفظ الأول (للحصول على الـ ID التلقائي من قاعدة البيانات)
        Order orderSaved = orderRepo.save(order);

        // 8. تحديث الكود ليصبح الكود النهائي المعتمد على الـ ID (مثلاً RES-15)
        orderSaved.setCode("RES-" + orderSaved.getId());

        // 9. الحفظ النهائي بعد تحديث الكود
        orderSaved = orderRepo.save(orderSaved);

        notificationService.createNotification(
                account.getId(),
                "Your order has been created successfully",
                "ORDER"
        );


        // 10. إرجاع الـ Response بالبيانات النهائية وحالة النجاح
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
