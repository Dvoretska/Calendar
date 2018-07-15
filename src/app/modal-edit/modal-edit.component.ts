import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {
  @Input() selectedKey: string;
  @Input() isModalEditShown: boolean;

  @Output() eventClicked = new EventEmitter<Event>();

  private _allEvents: Object;
  events: Array<any>;

  constructor() { }

  ngOnInit() {
  }

  updateEvents(): void {
    this._allEvents = JSON.parse(localStorage.getItem("events")) || {};
    this.events = this._allEvents[this.selectedKey] || [];
  }
  saveUpdatedEvent(): void {
    this._allEvents[this.selectedKey] = this.events;
    localStorage.setItem("events", JSON.stringify(this._allEvents));
    this.eventClicked.emit();
    this.isModalEditShown = false;
  }
  isDisabled(): boolean {
    for(let event of this.events) {
      if(!event[1]) {
        return true;
      }
    }
  }

}
