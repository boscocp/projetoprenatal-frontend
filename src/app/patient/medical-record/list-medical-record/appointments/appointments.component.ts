import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Appointment } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnChanges {
  @Input() appointments: Appointment[] = [];
  @Output() onReload = new EventEmitter();
  rows: Appointment[] = []
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['appointments']) this.rows=this.appointments;
  }

  needReload() {
    this.onReload.emit();
  }
}
