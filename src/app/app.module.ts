import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ModalEditComponent } from './modal-edit/modal-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarCellComponent,
    ModalComponent,
    ModalEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent
  ]
})
export class AppModule { }
