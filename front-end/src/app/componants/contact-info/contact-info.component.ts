import { Component, OnInit } from '@angular/core';
import { ContactInfoService } from "../../../service/contact-info.service";

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  contactData = {

    name: '',
    email: '',
    subject: '',
    message: ''

  };

  successMessage: string = '';

  constructor(private contactInfoService: ContactInfoService) { }

  ngOnInit(): void {
  }

  sendMessage() {

    this.contactInfoService
      .sendMessage(this.contactData)
      .subscribe({

        next: (response: any) => {

          console.log("MESSAGE SENT", response);

          this.successMessage =
            "Message sent successfully";

          this.contactData = {

            name: '',
            email: '',
            subject: '',
            message: ''

          };

        },

        error: (error: any) => {

          console.log("CONTACT ERROR", error);

        }

      });

  }

}