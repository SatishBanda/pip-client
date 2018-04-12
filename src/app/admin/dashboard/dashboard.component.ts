import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public rowsOnPage = 5;
  public filterQuery = "";
  public evaluationsTableData = [
    {
      "candidate_id": "CID0001",
      "name": "John",
      "email": "david@outlook.com",
      "phone": "999-999-9999",
      "evaluation_history": "Paglieta"
    },
    {
      "candidate_id": "CID0002",
      "name": "David M",
      "email": "	roney@pip.com",
      "phone": "999-777-9999",
      "evaluation_history": "Paglieta"
    },
    {
      "candidate_id": "CID0003",
      "name": "Roney L",
      "email": "steve@outlook.com",
      "phone": "999-222-1111",
      "evaluation_history": "Paglieta"
    },
    {
      "candidate_id": "CID0004",
      "name": "Roney L",
      "email": "steve@outlook.com",
      "phone": "999-999-9999",
      "evaluation_history": "Paglieta"
    },
    {
      "candidate_id": "CID0005",
      "name": "David L",
      "email": "steve@outlook.com",
      "phone": "999-999-9999",
      "evaluation_history": "Paglieta"
    },
    {
      "candidate_id": "CID0006",
      "name": "John L",
      "email": "steve@outlook.com",
      "phone": "999-999-9999",
      "evaluation_history": "Paglieta"
    }
  ];

  public enquiriesTableData = [
    {
      "candidate_name": "Ganesh",
      "email": "david@outlook.com",
      "phone": "999-999-9999",
      "subject": "Regarding Authentication",
      "conversation_history": "Paglieta",
      "last_updated": "29/12/17"
    },
    {
      "candidate_name": "Roney L",
      "email": "roney@outlook.com",
      "phone": "857-999-9999",
      "subject": "Regarding Payments",
      "conversation_history": "Paglieta",
      "last_updated": "29/12/17"
    },
    {
      "candidate_name": "Steve R",
      "email": "steve@outlook.com",
      "phone": "999-999-9999",
      "subject": "Regarding Venues",
      "conversation_history": "Paglieta",
      "last_updated": "29/12/17"
    },
    {
      "candidate_name": "Roney G",
      "email": "roney@outlook.com",
      "phone": "987-999-9999",
      "subject": "Regarding Venues",
      "conversation_history": "Paglieta",
      "last_updated": "29/12/17"
    },
    {
      "candidate_name": "John",
      "email": "john@outlook.com",
      "phone": "999-787-9999",
      "subject": "Regarding Authentication",
      "conversation_history": "Paglieta",
      "last_updated": "29/12/17"
    },
    {
      "candidate_name": "Steve",
      "email": "steve@outlook.com",
      "phone": "985-999-9999",
      "subject": "Regarding Authentication",
      "conversation_history": "Paglieta",
      "last_updated": "29/12/17"
    }
  ];

  Highcharts = Highcharts;
  columnChartOptions = {
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'No.Of Evaluations'
      }
    },
    title : { text : 'Evaluations per month for a year' },
    series: [{
      type: 'column',
      name: 'Evaluations',
      data: [49, 75, 104, 129, 144, 176, 135, 148, 214, 191, 95, 54]
    }]
  };

  locationChartOptions = {
    title : { text : 'Distribution of evaluations by Location' },
    series: [{
      type: 'pie',
      titles: [
        {
          "id": "Title-1",
          "size": 15,
          "text": "Tickets"
        }
      ],
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'NewYork',
        y: 61,
        sliced: false,
        selected: true
      }, {
        name: 'Chicago',
        y: 84
      }, {
        name: 'Houston',
        y: 85
      }, {
        name: 'San Jose',
        y: 67
      }, {
        name: 'Dallas',
        y: 48
      }, {
        name: 'Seattle',
        y: 64
      }]
    }]
  };

  evaluationChartOptions = {
    title : { text : 'Distribution of evaluations by Evaluator' },
    series: [{
      type: 'pie',
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Anthony',
        y: 21,
        sliced: false,
        selected: false
      }, {
        name: 'Babbitt',
        y: 14
      }, {
        name: 'Elizabeth',
        y: 15
      }, {
        name: 'Edward',
        y: 17
      }, {
        name: 'Henry',
        y: 18
      }, {
        name: 'John',
        y: 16
      }, {
        name: 'Thomas',
        y: 16
      }]
    }]
  };

  constructor() { }
  options;
  ngOnInit() {

  }
}
