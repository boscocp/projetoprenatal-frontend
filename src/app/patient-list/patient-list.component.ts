import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient, PatientDTO } from '../shared/interfaces';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: PatientDTO[] = [];
  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.http.get<PatientDTO[]>('http://localhost:1024/user/patient/0', {withCredentials: true})
      .subscribe((res: PatientDTO[]) => {this.patients = res,
        console.log(this.patients)
      });
  }

}
