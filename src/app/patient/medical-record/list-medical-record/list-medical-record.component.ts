import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/shared/interfaces';
import { PatientService } from '../../patient-service';

@Component({
  selector: 'app-list-medical-record',
  templateUrl: './list-medical-record.component.html',
  styleUrls: ['./list-medical-record.component.css']
})
export class ListMedicalRecordComponent implements OnInit {
  appointments: Appointment[]=[];
  constructor(private patientService: PatientService) { }
  @Input() id!: number;
  ngOnInit(): void {
    this.callAppointments();
  }

  callAppointments() {
    this.patientService.appointmentsByPatientId(this.id).subscribe(appointments => {
      this.appointments = appointments;
    }, error => console.log(error));
  }

}
