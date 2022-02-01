import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OtherExam } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit , OnChanges{
  @Input() exams: OtherExam[] = [];
  @Input() patientName!: string;
  @Output() onReload = new EventEmitter();
  rows= new MatTableDataSource<OtherExam>();

  displayedColumns: string[] = ['name', 'value', 'date','delete'];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['exams']) this.rows.data =  this.exams;
  }

  needReload() {
    this.onReload.emit();
  }

  ngOnInit(): void {
    this.rows.data =  this.exams;
  }

}
