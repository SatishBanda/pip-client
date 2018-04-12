import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  @ViewChild('candidatesModal') public candidatesModal: ModalDirective;

  public rowsOnPage = 5;
  public filterQuery = "";
  public candidatesTableData = [
    {
      "candidate_id": "CID0001",
      "name": "John",
      "email": "david@outlook.com",
      "phone": "999-999-9999"
    },
    {
      "candidate_id": "CID0002",
      "name": "David M",
      "email": "	roney@pip.com",
      "phone": "999-777-9999"
    },
    {
      "candidate_id": "CID0003",
      "name": "Roney L",
      "email": "steve@outlook.com",
      "phone": "999-222-1111"
    },
    {
      "candidate_id": "CID0004",
      "name": "Roney L",
      "email": "steve@outlook.com",
      "phone": "999-999-9999"
    },
    {
      "candidate_id": "CID0005",
      "name": "David L",
      "email": "steve@outlook.com",
      "phone": "999-999-9999"
    },
    {
      "candidate_id": "CID0006",
      "name": "John L",
      "email": "steve@outlook.com",
      "phone": "999-999-9999"
    }
  ];

  constructor(
    private title: Title
  ) {

    let currentTitle = this.title.getTitle();

    this.title.setTitle('PIP | Admin | Candidates');
  }

  ngOnInit() {
  }

  
}
