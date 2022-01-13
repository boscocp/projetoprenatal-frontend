import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/token/token.service';
import { Patient, PatientDTO } from 'src/app/shared/interfaces';
import { PatientService } from '../../patient-service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PatientsComponent implements OnChanges, OnInit {
  @Input() patients: PatientDTO[] = [];
  @Output() onReload = new EventEmitter();
  @ViewChild(MatSort)sort: MatSort = new MatSort;
  rows = new MatTableDataSource<PatientDTO>();
  columnsToDisplay : string[] = ['name'];
  expandedElement!: Patient | null;
  user!: string;
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.rows.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['patients']) this.rows = new MatTableDataSource<PatientDTO>(this.patients)
  }

  needReload() {
    this.onReload.emit();
  }

  openPatient(id: string):  void {
    this.router.navigate(['/patient/detail/'+id])
  }
  updatePatient(id: string): void {
    this.router.navigate(['/patient/update/'+id])
  }
}
