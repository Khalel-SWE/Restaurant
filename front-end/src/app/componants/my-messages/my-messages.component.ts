import { Component, OnInit } from '@angular/core';
import { ContactInfoService } from '../../../service/contact-info.service';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})
export class MyMessagesComponent implements OnInit {

  messages: any[] = [];

  constructor(
    private contactInfoService: ContactInfoService
  ) { }

  ngOnInit(): void {

    this.loadMessages();

  }

  loadMessages() {

    this.contactInfoService
      .getMyMessages()
      .subscribe({

        next: (response: any) => {

          console.log("MY MESSAGES", response);

          this.messages = response;

        },

        error: (error: any) => {

          console.log(error);

        }

      });

  }

}