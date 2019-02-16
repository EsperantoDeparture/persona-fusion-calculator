import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public location: Location, public dataService: DataService, public router: Router) { }

  ngOnInit() {
  }

}
