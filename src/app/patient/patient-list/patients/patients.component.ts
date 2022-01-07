import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  rows: PatientDTO[]=[];
  columnsToDisplay : string[] = ['name'];
  expandedElement!: Patient | null;
  user!: string;
  constructor(
    private patientService: PatientService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['patients']) this.rows=this.patients;
  }

  needReload() {
    this.onReload.emit();
  }

  openPatient(id: string):  void {
    this.router.navigate(['/detail/'+id])
  }
}
