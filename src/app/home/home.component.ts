import { Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from '../models/persona.model';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataService } from '../data/data.service';

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
  dataSource = new MatTableDataSource<Persona>(this.dataService.getPersonae());
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['level', 'name', 'arcana'];
  name = '';
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
