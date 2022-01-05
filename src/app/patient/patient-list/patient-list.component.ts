import { Component, OnInit } from '@angular/core';
import { PatientDTO, Patient } from '../../shared/interfaces';
import { PatientService } from '../patient-service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PatientListComponent implements OnInit {
  patients: PatientDTO[] = [];
  displayedColumns: string[] = ['name', 'cpf', 'birt_date'];
  expandedElement!: Patient | null;
  constructor(
    private patientService: PatientService
    ) { }

  ngOnInit(): void {
    this.patientService.getPatients()
      .subscribe((res: PatientDTO[]) => {this.patients = res
      });
  }

}
