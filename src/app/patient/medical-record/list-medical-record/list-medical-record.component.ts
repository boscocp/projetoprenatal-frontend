import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/shared/interfaces';
import { PatientService } from '../../patient-service';

@Component({
  selector: 'app-list-medical-record',
  templateUrl: './list-medical-record.component.html',
  styleUrls: ['./list-medical-record.component.css']
})
export class ListMedicalRecordComponent implements OnInit {
  appointments: Appointment[]=[];
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
    ) { }
  @Input() patientName!: string;
  id!:number;
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.callAppointments();
  }

  callAppointments() {
    console.log("entrou call appointemnts")
    this.patientService.appointmentsByPatientId(this.id).subscribe(appointments => {
      this.appointments = appointments;
    }, error => console.log(error));
  }

}
