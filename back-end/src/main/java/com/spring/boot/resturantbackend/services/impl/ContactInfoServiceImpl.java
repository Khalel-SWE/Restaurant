//package com.spring.boot.resturantbackend.services.impl;
//
//import com.spring.boot.resturantbackend.dto.ContactInfoDto;
//import com.spring.boot.resturantbackend.mappers.ContactInfoMapper;
//import com.spring.boot.resturantbackend.models.ContactInfo;
//import com.spring.boot.resturantbackend.repositories.ContactInfoRepo;
//import com.spring.boot.resturantbackend.services.ContactInfoService;
//import jakarta.transaction.SystemException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Objects;
//
//@Service
//public class ContactInfoServiceImpl implements ContactInfoService {
//
//    @Autowired
//    private ContactInfoRepo contactInfoRepo;
//
//    @Override
//    public ContactInfoDto createContactInfo(ContactInfoDto contactInfoDto) {
//        try {
//            if (Objects.nonNull(contactInfoDto.getId())) {
//                throw new SystemException("id.must_be.null");
//            }
//            ContactInfo contactInfo = ContactInfoMapper.CONTACT_INFO_MAPPER.toContactInfo(contactInfoDto);
//            contactInfo = contactInfoRepo.save(contactInfo);
//            return ContactInfoMapper.CONTACT_INFO_MAPPER.toContactInfoDto(contactInfo);
//        } catch (Exception e) {
//            throw new RuntimeException(e.getMessage());
//        }
//    }
//}


package com.spring.boot.resturantbackend.services.impl;

import com.spring.boot.resturantbackend.dto.ContactInfoDto;
import com.spring.boot.resturantbackend.models.ContactInfo;
import com.spring.boot.resturantbackend.models.security.Account;
import com.spring.boot.resturantbackend.repositories.ContactInfoRepo;
import com.spring.boot.resturantbackend.services.ContactInfoService;
import com.spring.boot.resturantbackend.services.security.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactInfoServiceImpl implements ContactInfoService {

    @Autowired
    private ContactInfoRepo contactInfoRepo;

    @Autowired
    private AccountService accountService;

    @Override
    public ContactInfoDto createContactInfo(ContactInfoDto contactInfoDto) {

        Account account =
                accountService.getCurrentAccount();

        ContactInfo contactInfo = new ContactInfo();

        contactInfo.setName(contactInfoDto.getName());
        contactInfo.setEmail(contactInfoDto.getEmail());
        contactInfo.setSubject(contactInfoDto.getSubject());
        contactInfo.setMessage(contactInfoDto.getMessage());

        contactInfo.setReply("No reply yet");

        contactInfo.setAccount(account);

        ContactInfo saved =
                contactInfoRepo.save(contactInfo);

        contactInfoDto.setId(saved.getId());

        return contactInfoDto;
    }
}
