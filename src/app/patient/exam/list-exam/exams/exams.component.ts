import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OtherExam } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  @Input() exams: OtherExam[] = [];
  qOne: OtherExam[] = [];
  qTwo: OtherExam[] = [];
  qThree: OtherExam[] = [];
  rows1= new MatTableDataSource<OtherExam>();
  rows2= new MatTableDataSource<OtherExam>();
  rows3= new MatTableDataSource<OtherExam>();
  @Input() patientName!: string;
  @Output() onReload = new EventEmitter();
  displayedColumns: string[] = ['name', 'value', 'date','delete'];
  constructor() { }
  needReload() {
    this.onReload.emit();
  }

  ngOnInit(): void {
  }

  setQuarter (exams: OtherExam[]) {
    this.exams = exams;
    this.qOne = [];
    this.qTwo = [];
    this.qThree = [];
    exams.forEach(obj=>{
      if (this.gestationalWeekCalculator(obj.exam?.date) <= 13.03) {
        this.qOne.push(obj);
      }else if(this.gestationalWeekCalculator(obj.exam?.date) > 13.03
      && this.gestationalWeekCalculator(obj.exam?.date) <= 26.07) {
        this.qTwo.push(obj);
      } else {
        this.qThree.push(obj);
      }
    });
    this.rows1.data = this.qOne;
    this.rows2.data = this.qTwo;
    this.rows3.data = this.qThree;
  }

  gestationalWeekCalculator(date: any): number{
    if(date){
      const dum = new Date(date);
      const today = new Date(Date.now());
      const timeDiff = Math.abs(today.getTime()- dum.getTime());
      const weeks = timeDiff/(1000*60*60*24*7);
      return weeks;
    }
    throw new Error("Não foi possível calcular IG");
  }

}
