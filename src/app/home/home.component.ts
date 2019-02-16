import { Component, OnInit } from '@angular/core';
import { personae } from '../data/persona4-golden';
import { Persona } from '../models/persona.model';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          height: '0px',
          display: 'none'
        })
      ),
      transition('void <=> *', animate(500))
    ])
  ]
})
export class HomeComponent implements OnInit {
  personae: Persona[] = personae;
  name = '';
  constructor() {}

  ngOnInit() {}

  filter() {
    this.personae = personae.filter(
      persona =>
        persona.name.toLowerCase().indexOf(this.name.toLowerCase()) !== -1
    );
  }
}
