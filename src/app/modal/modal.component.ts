import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() isModalShown: boolean;
  @Input() selectedKey: string;

  @Output() eventClicked = new EventEmitter<Event>();

  subject: string;
  user: string;
  time: string;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges (changes: SimpleChanges) {
    this.subject = '';
    this.user = '';
    this.time = '';
	}
  saveEvent(): void {
    const events = JSON.parse(localStorage.getItem("events")) || {}
    const key = this.selectedKey;
    if (!events[key])
    {
      events[key] = {};
    }
    events[key][this.time] = [this.subject, this.user];
    localStorage.setItem("events", JSON.stringify(events));
    this.isModalShown = false;
    this.eventClicked.emit();
  }
}
