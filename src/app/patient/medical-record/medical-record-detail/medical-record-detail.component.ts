import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patient } from 'src/app/shared/interfaces';
import { Appointment } from '../../ipatient';
import { PatientService } from '../../patient-service';

@Component({
  selector: 'app-medical-record-detail',
  templateUrl: './medical-record-detail.component.html',
  styleUrls: ['./medical-record-detail.component.css']
})
export class MedicalRecordDetailComponent implements OnInit {
  @Output() onSelect = new EventEmitter<Appointment[]>();
  @Input() id: number = 1;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.appointmentById(this.id).subscribe(appointment => this.onSelect.emit(appointment));
  }

}
