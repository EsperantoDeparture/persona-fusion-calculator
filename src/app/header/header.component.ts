import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          width: '0px',
          display: 'none'
        })
      ),
      transition('void <=> *', animate(225))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  constructor(public location: Location, public dataService: DataService, public router: Router) { }

  ngOnInit() {
  }

}
