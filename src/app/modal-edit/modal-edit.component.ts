import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {
  @Input() selectedKey: string;
  @Input() isModalEditShown: boolean;
  objectKeys = Object.keys;
  events: Object;

  constructor() { }

  ngOnInit() {

  }
  updateEvents(): void {
    const eventsLocal = JSON.parse(localStorage.getItem("events")) || {};
    const key = this.selectedKey;
    this.events = eventsLocal[key] || {};
  }

}
