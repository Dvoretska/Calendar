import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import 'moment/locale/ru'
import { ModalEditComponent } from '../modal-edit/modal-edit.component'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
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
  searchValue: string = '';
  searchResult: any[] = [];

  @ViewChild(ModalEditComponent) child:ModalEditComponent;

  constructor() { }

  ngOnInit() {
    this.setLocale('ru');
    this.generateWeeks();
    this.readSavedEvents();
  }

  readSavedEvents(): void {
    this.savedEvents = JSON.parse(localStorage.getItem("events")) || {};
  }
  setLocale(lang): void {
    this.moment.locale(lang);
  }
  showToday(): void {
    this.moment = moment();
    this.selectDay(this.getFormattedDate(this.moment));
    this.generateWeeks();
  }
  prevMonth(): void {
    this.moment = moment(this.moment).subtract(1, 'months');
    this.generateWeeks();
  }
  nextMonth(): void {
    this.moment = moment(this.moment).add(1, 'months');
    this.generateWeeks();
  }
  getTitle(title: string): string {
    return title[0].toUpperCase() + title.slice(1);
  }
  getFormattedDate(date): string {
    return date.format('D MMM YYYY');
  }
  generateWeeks(): void {
    let days = [];
    const startOfTable = moment(this.moment).startOf('month').subtract(this.getPrevOfTable(), 'days');
    const startOfMonth = moment(this.moment).startOf('month');
    for (let i = 0; i < 42; i++) {
      days.push({
        date: startOfTable.add(1, 'days').date(),
        month: startOfTable.date() == 1 ? startOfTable.format('MMM').slice(0, 3) : null,
        weekday: i < 7 ? this.getTitle(startOfTable.format('dd')) : null,
        isToday: this.getFormattedDate(startOfTable) == this.getFormattedDate(this.today),
        isCurrentMonth: startOfTable.format('MMM') == startOfMonth.format('MMM'),
        key: this.getFormattedDate(startOfTable)
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
    this.disabledEditBtn = !this.savedEvents[this.selectedKey]
    this.disabledAddBtn = false;
    this.isModalShown = false;
    this.isModalEditShown = false;
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
  search() {
    this.searchResult = [];
    if(!this.searchValue) return;
    const searchDate = moment(this.searchValue);
    if(searchDate.isValid()) {
      this.moment = searchDate;
      this.selectDay(this.getFormattedDate(searchDate));
      this.generateWeeks();
      this.searchResult.push(this.getFormattedDate(searchDate));
    } else {
      for (let key in this.savedEvents) {
        for (let item of this.savedEvents[key]) {
          if (item[1].indexOf(this.searchValue) !== -1) {
            this.searchResult.push(key);
            break;
          } else {
            if(item[2] == this.searchValue) {
              this.searchResult.push(key);
              break;
            }
          }
        }
      }
    }
  }
}
