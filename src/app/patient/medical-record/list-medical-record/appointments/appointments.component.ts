import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Appointment } from 'src/app/shared/interfaces';
import {MatTableDataSource} from '@angular/material/table';

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
export class AppointmentsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() appointments: Appointment[] = [];
  @Input() patientName!: string;
  @Output() onReload = new EventEmitter();
  // @ViewChild('outerSort', { static: true }) sort!: MatSort;
  rows= new MatTableDataSource<Appointment>();
  columnsToDisplay : string[] = ['date','weight','ig','pa','edema','av','bcf','cd'];
  expandedElement!: Appointment | null;
  constructor(
    // private cd: ChangeDetectorRef
    ) { }
  ngOnInit(): void {
    this.rows.data =  this.appointments;
  }

  ngAfterViewInit(): void {
    // this.rows.sort = this.sort;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['appointments']) this.rows.data =  this.appointments;
  }

  needReload() {
    console.log("entrou needReload");
    this.onReload.emit();
  }
  toggleRow(element: Appointment) {
    this.expandedElement = this.expandedElement === element ? null : element;
    // this.cd.detectChanges();
  }

  // announceSortChange(sort:any){

  //   this.rows.data.forEach(element => {
  //     this.expandedElement = this.expandedElement === element ? null : element;
  //     this.cd.detectChanges();
  //   });
  // }

}
