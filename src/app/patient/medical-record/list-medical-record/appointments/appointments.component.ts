import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Addendum, Appointment } from 'src/app/shared/interfaces';
import {MatTableDataSource} from '@angular/material/table';
import { PatientService } from 'src/app/patient/patient-service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AppointmentsComponent implements OnInit, OnChanges {
  @Input() appointments: Appointment[] = [];
  @Input() patientName!: string;
  @Output() onReload = new EventEmitter();
  rows= new MatTableDataSource<Appointment>();
  colsToDisplay = {
    //'date': 'Data',
    'weight': 'Peso',
    'ig': 'IG',
    'pa': 'PA',
    'edema': 'Edema',
    'au': 'AU',
    'bcf': 'BCF',
    'cd': 'CD'
  };
  columnsToDisplay : string[] = [];

  expandedElement!: Appointment | null;
  addedums: Addendum[]=[];
  constructor(
    private patienteService: PatientService
    ) {
      this.columnsToDisplay.push("date");
      this.columnsToDisplay.push(...Object.keys(this.colsToDisplay));
     }
  ngOnInit(): void {
    this.rows.data =  this.appointments;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['appointments']) this.rows.data =  this.appointments;
  }

  needReload() {
    console.log("entrou needReload");
    this.onReload.emit();
  }
  toggleRow(element: Appointment) {
    this.addedums = [];
    this.patienteService.getAddemdums(Number(element.id)).subscribe(res=>{
      this.addedums = res;
    });
    this.expandedElement = this.expandedElement === element ? null : element;
  }

}
