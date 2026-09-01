import { Component, OnInit } from '@angular/core';
import { ContactInfoService } from '../../../service/contact-info.service';

@Component({
  selector: 'app-admin-contact-messages',
  templateUrl: './admin-contact-messages.component.html',
  styleUrls: ['./admin-contact-messages.component.css']
})
export class AdminContactMessagesComponent implements OnInit {

  messages: any[] = [];
  tempReplies: { [key: number]: string } = {};

  constructor(private contactInfoService: ContactInfoService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.contactInfoService.getAllMessages().subscribe({
      next: (response: any) => {
        console.log("ALL MESSAGES", response);
        this.messages = response;
      },
      error: (error: any) => {
        console.log("FULL ERROR", error);
        console.log("STATUS", error.status);
        console.log("ERROR BODY", error.error);
      }
    });
  }

  sendReply(message: any) {
    const replyText = this.tempReplies[message.id];

    if (!replyText || replyText.trim() === '') {
      alert("Reply cannot be empty");
      return;
    }

    this.contactInfoService.replyMessage(message.id, replyText).subscribe({
      next: () => {
        console.log("REPLY SENT");
        message.reply = replyText;
        delete this.tempReplies[message.id];
      },
      error: (error: any) => {
        console.log("REPLY ERROR", error);
        alert("An error occurred while sending the reply.");
      }
    });
  }
}