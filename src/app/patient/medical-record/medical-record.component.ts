import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {
  @Input() patientName!: string;
  constructor(
    ) { }

  ngOnInit(): void {

  }

}
