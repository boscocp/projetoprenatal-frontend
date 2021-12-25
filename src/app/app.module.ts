import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './register/register.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailComponent } from './patient/patient-detail/patient-detail.component';
import { CreateMedicalRecordComponent } from './patient/medical-record/create-medical-record/create-medical-record.component';
import { ListMedicalRecordComponent } from './patient/medical-record/list-medical-record/list-medical-record.component';
import { MedicalRecordDetailComponent } from './patient/medical-record/medical-record-detail/medical-record-detail.component';
import { PatientModule } from './patient/patient.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    RegisterComponent,
    PatientCreateComponent,
    PatientListComponent,
    PatientDetailComponent,
    CreateMedicalRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PatientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
