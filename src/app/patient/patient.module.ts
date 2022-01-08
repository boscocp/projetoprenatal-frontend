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
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { PatientDeleteComponent, PatientDeleteDialog } from './patient-delete/patient-delete.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { PatientsComponent } from './patient-list/patients/patients.component';
import { SearchComponent } from './patient-list/search/search.component';
import { FilterByName } from './patient-list/filter-by-name';
import { PatientUpdateComponent } from './patient-update/patient-update.component';
@NgModule({
  declarations: [
    MedicalRecordDetailComponent,
    AppointmentsComponent,
    ListMedicalRecordComponent,
    SelectAppointmentComponent,
    PatientDetailComponent,
    PatientListComponent,
    PatientCreateComponent,
    PatientComponent,
    PatientDeleteComponent,
    PatientDeleteDialog,
    PersonalInformationComponent,
    PatientsComponent,
    SearchComponent,
    FilterByName,
    PatientUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  exports: [
    PatientComponent
  ]
})
export class PatientModule { }
