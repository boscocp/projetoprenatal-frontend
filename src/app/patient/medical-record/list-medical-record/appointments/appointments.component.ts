import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Appointment } from 'src/app/patient/ipatient';

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