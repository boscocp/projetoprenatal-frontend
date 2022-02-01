import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address, Patient } from 'src/app/shared/interfaces';
import { PatientService } from '../patient-service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  address!: Address;
  addresses: Address[]=[];
  @Input() id!: number;
  @Input() patient!: Patient;
  constructor(
    private router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void {
    this.patientService.getAddress(this.id)
    .subscribe((res: Address[]) => {
      this.addresses = res,
      this.address = res[0]
    });
  }
  needReload() {
    this.router.navigate(['/'])
  }

  updatePatient(id: number): void {
    this.router.navigate(['/patient/update/'+id])
  }
}
