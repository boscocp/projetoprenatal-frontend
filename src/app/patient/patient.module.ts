import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalRecordDetailComponent } from './medical-record/medical-record-detail/medical-record-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentsComponent } from './medical-record/list-medical-record/appointments/appointments.component';
import { ListMedicalRecordComponent } from './medical-record/list-medical-record/list-medical-record.component';
import { RouterModule } from '@angular/router';
import { SelectAppointmentComponent } from './medical-record/select-appointment/select-appointment.component';

@NgModule({
  declarations: [
    MedicalRecordDetailComponent,
    AppointmentsComponent,
    ListMedicalRecordComponent,
    SelectAppointmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    MedicalRecordDetailComponent,
    ListMedicalRecordComponent
  ]
})
export class PatientModule { }
