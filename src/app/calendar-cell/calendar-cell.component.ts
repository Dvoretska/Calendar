import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.css']
})
export class CalendarCellComponent implements OnInit {
  @Input() day: Object;
  @Input() selectedKey: string;
  @Input() savedEvents: Object;
  @Input() searchResult: Array<string>;

  objectKeys = Object.keys;
  constructor() {
  }

  ngOnInit() {
  }
}
