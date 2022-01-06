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
  address!: Address;
  addresses: Address[]=[];
  id: number = 1;
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    this.patientService.getPatient(id)
    .subscribe((res: Patient) => {this.patient = res;
    });

    this.patientService.getAddress(id)
    .subscribe((res: Address[]) => {
      this.addresses = res,
      this.address = res[0]
    });


  }
}
