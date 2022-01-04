import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { MedicalRecordDetailComponent } from './patient/medical-record/medical-record-detail/medical-record-detail.component';
import { PatientDetailComponent } from './patient/patient-detail/patient-detail.component';
import { RegisterComponent } from './home/register/register.component';
import { AuthguardService } from './core/auth/authguard.service';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'detail/:id',
    component: PatientDetailComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'appointment/detail/:id',
    component: MedicalRecordDetailComponent,
    canActivate: [AuthguardService]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
