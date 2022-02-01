import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address, Patient } from 'src/app/shared/interfaces';
import { PatientService } from '../patient-service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patient!: Patient;
  name = '';
  address!: Address;
  addresses: Address[]=[];
  id: number = 1;
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.patientService.getPatient(Number(this.route.snapshot.paramMap.get('id')))
    .subscribe((res: Patient) => {
      this.id = Number(res.id);
      this.patient = res;
      this.name = res.person.name;
    });
  }
}
