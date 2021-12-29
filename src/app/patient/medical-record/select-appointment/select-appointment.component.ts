import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../../ipatient';
import { PatientService } from '../../patient-service';

@Component({
  selector: 'app-select-appointment',
  templateUrl: './select-appointment.component.html',
  styleUrls: ['./select-appointment.component.css']
})
export class SelectAppointmentComponent {
  @Output() onSelect = new EventEmitter<Appointment>();
  @Output() selectPatient = new EventEmitter<string>();
  @Input() id!: string;
  @Input() name!: string;

  constructor(private patientService: PatientService) { }

  select(){
    this.patientService.appointmentById(parseInt(this.id,10)).subscribe(appointment => this.onSelect.emit(appointment));
    this.selectPatient.emit(this.name);
  }
}
