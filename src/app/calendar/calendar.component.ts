import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import 'moment/locale/ru'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  weeks: any[][] = [];
  moment: moment.Moment = moment();
  constructor() { }

  ngOnInit() {
    this.setLocale('ru');
    this.getWeeks();
  }
  setLocale(lang) {
    this.moment.locale(lang);
  }

  prevMonth(): void {
    this.moment = moment(this.moment).subtract(1, 'months');
    this.getWeeks();
  }

  nextMonth(): void {
    this.moment = moment(this.moment).add(1, 'months');
    this.getWeeks();
  }

  getWeeks () {
    let days = [];
    const startOfTable = moment(this.moment).startOf('month').subtract(this.getPrevOfTable(), 'days');
    for(let i = 0; i < 42; i++) {
      days.push(startOfTable.add(1, 'days').date());
    }
    this.weeks = _.chunk(days, 7);
    // console.log(moment(this._moment).startOf('month').format('MMM').slice(0,3))
  }

  getPrevOfTable () {
    const firstOfMonth = moment(this.moment).startOf('month').day();
    return firstOfMonth == 0 ? 7 : firstOfMonth;
  }

}
