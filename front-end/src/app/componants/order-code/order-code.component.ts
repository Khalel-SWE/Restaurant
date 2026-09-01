import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-order-code',
  templateUrl: './order-code.component.html',
  styleUrls: ['./order-code.component.css']
})
export class OrderCodeComponent implements OnInit {

  code: string = "";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    const code = this.activatedRoute.snapshot.paramMap.get("code");

    if(code){
      this.code = code;
    } else {
      this.code = "NO CODE FOUND";
    }

    console.log(this.code);
  }

}
