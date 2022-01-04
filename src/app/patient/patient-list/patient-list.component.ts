import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient, PatientDTO } from '../../shared/interfaces';
import { PatientService } from '../patient-service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: PatientDTO[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private patientService: PatientService
    ) { }

  ngOnInit(): void {
    this.patientService.getPatients()
      .subscribe((res: PatientDTO[]) => {this.patients = res
      });
  }

}
