import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() isModalShown: boolean;
  @Input() selectedKey: string;
  subject: string;
  user: string;
  constructor() { }

  ngOnInit() {
    console.log('ngOninit')
  }
  ngOnChanges (changes: SimpleChanges) {
    this.subject = '';
    this.user = '';
	}
  saveEvent(): void {
    console.log(this.subject, this.user)
  }
}
