import { Component, OnInit } from '@angular/core';
import { PatientDTO, Patient } from '../../shared/interfaces';
import { PatientService } from '../patient-service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/token/token.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients:  PatientDTO[] = [];
  filter: string = '';
  user!: string;
  constructor(
    private patientService: PatientService,
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.loadPatients();
  }
  loadPatients(): void {
    this.patientService.getPatients()
      .subscribe((res: PatientDTO[]) => {this.patients = res
    });
  }

}
