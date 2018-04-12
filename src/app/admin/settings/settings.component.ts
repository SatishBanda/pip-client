import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private title: Title
  ) {

    let currentTitle = this.title.getTitle();

    this.title.setTitle('PIP | Admin | Settings');
  }

  ngOnInit() {
  }

}
