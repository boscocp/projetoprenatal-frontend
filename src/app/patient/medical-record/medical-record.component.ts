import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../patient-service';
import { Patient } from 'src/app/shared/interfaces';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {
  patientName!: string;
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.patientService.getPatient(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe((res: Patient) => {this.patientName = res.person.name;
    });
  }

}
