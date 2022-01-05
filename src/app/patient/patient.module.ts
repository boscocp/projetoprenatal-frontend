import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalRecordDetailComponent } from './medical-record/medical-record-detail/medical-record-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentsComponent } from './medical-record/list-medical-record/appointments/appointments.component';
import { ListMedicalRecordComponent } from './medical-record/list-medical-record/list-medical-record.component';
import { RouterModule } from '@angular/router';
import { SelectAppointmentComponent } from './medical-record/select-appointment/select-appointment.component';
import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table'


@NgModule({
  declarations: [
    MedicalRecordDetailComponent,
    AppointmentsComponent,
    ListMedicalRecordComponent,
    SelectAppointmentComponent,
    PatientDetailComponent,
    PatientListComponent,
    PatientCreateComponent,
    PatientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [
    PatientComponent
  ]
})
export class PatientModule { }
