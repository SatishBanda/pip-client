import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  @ViewChild('staffModal') public staffModal: ModalDirective;

  public rowsOnPage = 5;
  public filterQuery = "";
  public staffData = [
    {
      "staff_name": "John M	",
      "email": "john@outlook.com",
      "phone": "999-999-9999",
      "permissions": "0/4"
    },
    {
      "staff_name": "Steve R",
      "email": "stever@outlook.com",
      "phone": "999-999-9999",
      "permissions": "2/4"
    },
    {
      "staff_name": "Robert K",
      "email": "robertk@outlook.com",
      "phone": "999-999-9999",
      "permissions": "4/4"
    },
    {
      "staff_name": "Steve",
      "email": "steve@outlook.com",
      "phone": "999-999-9999",
      "permissions": "1/4"
    },
    {
      "staff_name": "Smith",
      "email": "smith@outlook.com",
      "phone": "999-999-9999",
      "permissions": "2/4"
    },
    {
      "staff_name": "Chapel",
      "email": "chapel@outlook.com",
      "phone": "999-999-9999",
      "permissions": "0/4"
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
