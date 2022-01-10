import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../patient-service';
import { Patient } from 'src/app/shared/interfaces';
@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {
  @Input() id!: number;
  idPatient!: number;
  patientName!: string;
  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.idPatient = this.id;
    this.patientService.getPatient(this.id)
    .subscribe((res: Patient) => {this.patientName = res.person.name;
    });
  }

}
