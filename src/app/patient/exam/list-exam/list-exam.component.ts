import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OtherExam, UltrassoundExam } from 'src/app/shared/interfaces';
import { PatientService } from '../../patient-service';
import { ExamsComponent } from './exams/exams.component';
import { UltrassoundsComponent } from './exams/ultrassounds/ultrassounds.component';

@Component({
  selector: 'app-list-exam',
  templateUrl: './list-exam.component.html',
  styleUrls: ['./list-exam.component.css']
})
export class ListExamComponent implements OnInit {
  @ViewChild(ExamsComponent) examChild!: ExamsComponent;
  @ViewChild(UltrassoundsComponent) ultrassoundChild!: UltrassoundsComponent;
  exams: OtherExam[]=[];
  ultrassounds: UltrassoundExam[]=[];
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
    this.patientService.getUltrassounds(this.id).subscribe(ultrassounds => {
      this.ultrassounds = ultrassounds;
      //this.ultrassoundChild.setUltrassounds(ultrassounds);
    });
    this.patientService.getExams(this.id).subscribe(exams => {
      this.exams = exams;
      this.examChild.setQuarter(exams);
    });
  }

}
