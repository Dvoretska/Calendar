import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import 'moment/locale/ru'
import { ModalEditComponent } from '../modal-edit/modal-edit.component'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  directives: [ModalEditComponent]
})
export class CalendarComponent implements OnInit {
  weeks: any[][] = [];
  moment: moment.Moment = moment();
  today: moment.Moment = moment();
  currentMonth: string;
  selectedKey: string;
  disabledAddBtn: boolean = true;
  disabledEditBtn: boolean = true;
  isModalShown: boolean = false;
  isModalEditShown: boolean = false;
  savedEvents: Object;
  @ViewChild(ModalEditComponent) child:ModalEditComponent;
  constructor() { }

  ngOnInit() {
    this.setLocale('ru');
    this.getWeeks();
    this.readSavedEvents();
  }

   readSavedEvents(): void {
     this.savedEvents = JSON.parse(localStorage.getItem("events")) || {}
   }
  setLocale(lang) {
    this.moment.locale(lang);
  }
  showToday(): void {
    this.moment = moment();
    this.selectDay(this.moment.format('D MMM'))
    this.getWeeks();
  }
  prevMonth(): void {
    this.moment = moment(this.moment).subtract(1, 'months');
    this.getWeeks();
  }
  nextMonth(): void {
    this.moment = moment(this.moment).add(1, 'months');
    this.getWeeks();
  }
  getTitle(title: string): string {
    return title[0].toUpperCase() + title.slice(1)
  }
  getWeeks(): void {
    let days = [];
    const startOfTable = moment(this.moment).startOf('month').subtract(this.getPrevOfTable(), 'days');
    const startOfMonth = moment(this.moment).startOf('month');
    for (let i = 0; i < 42; i++) {
      days.push({
        date: startOfTable.add(1, 'days').date(),
        month: startOfTable.date() == 1 ? startOfTable.format('MMM').slice(0, 3) : null,
        weekday: i < 7 ? this.getTitle(startOfTable.format('dd')) : null,
        isToday: startOfTable.format("MMM D YY") == this.today.format('MMM D YY'),
        isCurrentMonth: startOfTable.format('MMM') == startOfMonth.format('MMM'),
        key: startOfTable.format('D MMM YYYY')
      })
    }
    this.weeks = _.chunk(days, 7);
    this.currentMonth = this.getTitle(this.moment.format('MMMM YYYY'));
  }
  getPrevOfTable(): number {
    const firstOfMonth = moment(this.moment).startOf('month').day();
    return firstOfMonth == 0 ? 7 : firstOfMonth;
  }
  selectDay(key: string): void {
    this.selectedKey = key;
    this.disabledAddBtn = false;
    this.disabledEditBtn = false;
    this.isModalShown = false;
  }
  toggleModal(): void {
    this.isModalShown = !this.isModalShown;
    this.isModalEditShown = false;
  }
  toggleModalEdit(): void {
    this.isModalEditShown = !this.isModalEditShown;
    this.isModalShown = false;
    this.child.updateEvents();
  }

}
