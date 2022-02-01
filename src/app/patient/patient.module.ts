import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalRecordDetailComponent } from './medical-record/medical-record-detail/medical-record-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentsComponent } from './medical-record/list-medical-record/appointments/appointments.component';
import { ListMedicalRecordComponent } from './medical-record/list-medical-record/list-medical-record.component';
import { RouterModule } from '@angular/router';
import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import {MatTabsModule} from '@angular/material/tabs';

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
import { MedicalRecordComponent } from './medical-record/medical-record.component';
import { CreateMedicalRecordComponent } from './medical-record/create-medical-record/create-medical-record.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AppointmentUpdateDialog, UpdateMedicalRecordComponent } from './medical-record/update-medical-record/update-medical-record.component';
import { DeleteMedicalRecordComponent, DeleteMedicalRecordDialog } from './medical-record/delete-medical-record/delete-medical-record.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ExamComponent } from './exam/exam.component';
import { CreateExamComponent } from './exam/create-exam/create-exam.component';
import { DeleteExamComponent, DeleteExamDialog } from './exam/delete-exam/delete-exam.component';
import { UpdateExamComponent } from './exam/update-exam/update-exam.component';
import { ListExamComponent } from './exam/list-exam/list-exam.component';
import { ExamsComponent } from './exam/list-exam/exams/exams.component';


@NgModule({
  declarations: [
    MedicalRecordDetailComponent,
    AppointmentsComponent,
    ListMedicalRecordComponent,
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
    PatientUpdateComponent,
    MedicalRecordComponent,
    CreateMedicalRecordComponent,
    UpdateMedicalRecordComponent,
    DeleteMedicalRecordComponent,
    AppointmentUpdateDialog,
    DeleteMedicalRecordDialog,
    DeleteExamDialog,
    ExamComponent,
    CreateExamComponent,
    DeleteExamComponent,
    UpdateExamComponent,
    ListExamComponent,
    ExamsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  exports: [
    PatientComponent
  ]
})
export class PatientModule { }
