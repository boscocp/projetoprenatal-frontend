import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address, Patient } from 'src/app/shared/interfaces';
import { PatientService } from '../patient-service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  patient!: Patient;
  address!: Address;
  addresses: Address[]=[];
  @Input() id!: number;
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void {
    this.patientService.getPatient(this.id)
    .subscribe((res: Patient) => {this.patient = res;
    });

    this.patientService.getAddress(this.id)
    .subscribe((res: Address[]) => {
      this.addresses = res,
      this.address = res[0]
    });
  }
}
