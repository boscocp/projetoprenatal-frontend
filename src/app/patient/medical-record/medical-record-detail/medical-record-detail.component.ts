import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/shared/interfaces';
import { PatientService } from '../../patient-service';

@Component({
  selector: 'app-medical-record-detail',
  templateUrl: './medical-record-detail.component.html',
  styleUrls: ['./medical-record-detail.component.css']
})
export class MedicalRecordDetailComponent implements OnInit {
  appointment!: Appointment;
  name: string="";
  id: number = 1;
  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.appointmentById(this.id).subscribe(appointment => {this.appointment = appointment});
  }

}
