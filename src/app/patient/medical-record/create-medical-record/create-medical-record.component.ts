import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppointmentRegister, Appointment } from 'src/app/shared/interfaces';
import { PatientService } from '../../patient-service';

@Component({
  selector: 'app-create-medical-record',
  templateUrl: './create-medical-record.component.html',
  styleUrls: ['./create-medical-record.component.css']
})
export class CreateMedicalRecordComponent implements OnInit {
  form!: FormGroup;
  appointment!: Appointment;
  @Input() patientName!: string;
  patient_id!: string;
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.patient_id = String(this.route.snapshot.paramMap.get('id'));
    this.form = new FormGroup({
      weight : new FormControl('',Validators.maxLength(3)),
      date : new FormControl('',Validators.required),
      ig : new FormControl('',Validators.maxLength(10)),
      pa : new FormControl('',Validators.maxLength(10)),
      edema : new FormControl('',Validators.maxLength(10)),
      au : new FormControl('',Validators.maxLength(10)),
      bcf : new FormControl('',Validators.maxLength(10)),
      complication : new FormControl('',Validators.maxLength(200)),
      cd : new FormControl('',Validators.maxLength(10)),
      substance_use : new FormControl('',Validators.maxLength(200))
    });
  }

  getAppointment(): AppointmentRegister {
    let appointment : Appointment = {
      weight: this.form.get('weight')?.value,
      date: this.form.get('date')?.value,
      ig: this.form.get('ig')?.value,
      pa: this.form.get('pa')?.value,
      edema: this.form.get('edema')?.value,
      au: this.form.get('au')?.value,
      bcf: this.form.get('bcf')?.value,
      complication: this.form.get('complication')?.value,
      cd: this.form.get('cd')?.value,
      substance_use: this.form.get('substance_use')?.value
    }

    let appointmentRegister : AppointmentRegister = {
      patient_id: this.patient_id,
      appointment: appointment
    }
    return appointmentRegister;
  }

  createAppointment() {
    console.log(this.getAppointment())
    this.patientService.createAppointment(this.getAppointment())
      .subscribe((res: any) => {
        alert('Consulta criada com sucesso');
      });
  }

}
