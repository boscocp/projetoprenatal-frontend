import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  @Input() patientName!: string;
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
