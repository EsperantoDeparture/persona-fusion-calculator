import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-version-selector',
  templateUrl: './version-selector.component.html',
  styleUrls: ['./version-selector.component.scss']
})
export class VersionSelectorComponent implements OnInit {
  constructor(public dataService: DataService) {}

  ngOnInit() {}
}
