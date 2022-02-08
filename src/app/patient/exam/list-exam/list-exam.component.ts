import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OtherExam } from 'src/app/shared/interfaces';
import { PatientService } from '../../patient-service';
import { ExamsComponent } from './exams/exams.component';

@Component({
  selector: 'app-list-exam',
  templateUrl: './list-exam.component.html',
  styleUrls: ['./list-exam.component.css']
})
export class ListExamComponent implements OnInit {
  @ViewChild(ExamsComponent) child!: ExamsComponent;
  exams: OtherExam[]=[];
  @Input() patientName!: string;
  id!:number;
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {

   }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.callExams();
  }
  callExams() {
    this.patientService.getExams(this.id).subscribe(exams => {
      this.exams = exams;
      this.child.setQuarter(exams);
    });
  }

}
