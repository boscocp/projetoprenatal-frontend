import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address, Patient } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patient: Patient | undefined;
  address!: Address;
  addresses: Address[]=[];
  id: Number = 1;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    this.http.get<Patient>('http://localhost:1024/user/patient/'+id, {withCredentials: true})
    .subscribe((res: Patient) => {this.patient = res
    });

    this.http.get<Address[]>('http://localhost:1024/user/address/'+id, {withCredentials: true})
    .subscribe((res: Address[]) => {
      this.addresses = res,
      this.address = res[0]
    });


  }
}
