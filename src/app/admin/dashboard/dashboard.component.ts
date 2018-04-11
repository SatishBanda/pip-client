import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  options;
  ngOnInit() {
    this.options = {
      title: { text: 'chart 11 selection event example' },
      chart: { zoomType: 'x' },
      series: [{ data: [1, 4], }]
    };


    this.options = {
      "chart": {
        "type": "bar",
        "spacingTop": 10,
        "marginRight": 35,
        "className": "put-some-padding"
      },
      "credits": {
        "enabled": false
      },
      "title": {
        "text": "",
        "style": {
          "display": "none"
        }
      },
      "xAxis": {
        "title": {
          "text": null
        },
        "labels": {
          "style": {
            "color": "#393939",
            "cursor": "default",
            "fontSize": "13px"
          }
        },
        "categories": [
          "a",
          "b",
          "c2",
          "dddeees"
        ]
      },
      "yAxis": {
        "min": 0,
        "title": {
          "text": "",
          "align": "high"
        },
        "minorGridLineWidth": 0,
        "gridLineWidth": 0,
        "alternateGridColor": null
      },
      "tooltip": {
        "valueSuffix": " "
      },
      "plotOptions": {
        "bar": {
          "dataLabels": {
            "enabled": true,
            "style": {
              "color": "#010101",
              "fontSize": "13px"
            }
          },
          "colorByPoint": false,
          "color": "#2B5BA6"
        },
        "states": {
          "hover": {
            "enabled": false
          }
        }
      },
      "series": [
        {
          "data": [
            5,
            2,
            3,
            5
          ],
          "name": " ",
          "showInLegend": false
        }
      ],
      "exporting": {
        "buttons": {
          "contextButton": {
            "menuItems": [
              {
                "text": "Print chart",
                "separator": false
              },
              {
                "text": "Download PNG image",
                "separator": false
              },
              {
                "text": "Download JPEG image",
                "separator": false
              },
              {
                "text": "Download PDF document",
                "separator": false
              },
              {
                "text": "Download SVG vector image",
                "separator": false
              }
            ]
          }
        },
        "chartOptions": {
          "subtitle": {
            "text": ""
          }
        }
      }
    }


  }
}
