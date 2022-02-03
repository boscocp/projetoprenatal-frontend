import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  id!: number;
  @Input() patient!: Patient;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
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

  updatePatient(): void {
    this.router.navigate(['/patient/update/'+this.id])
  }
}
