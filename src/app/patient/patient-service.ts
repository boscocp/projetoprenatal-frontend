import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { Address, Patient, PatientDTO, PatientRegister } from '../shared/interfaces';
import { Appointment } from './ipatient';

@Injectable({ providedIn: 'root' })
export class PatientService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  appointmentsByPatientId(id: Number) {
    return this.http.get<Appointment[]>(this.url + '/user/appointments/'+id,{withCredentials: true});
  }
  appointmentById(id: Number) {
    return this.http.get<Appointment>(this.url + '/user/appointment/'+id,{withCredentials: true});
  }

  createPatient(patient: PatientRegister) {
    return this.http.post(this.url + '/user/patient/', patient, {withCredentials: true});
  }

  getPatient(id: Number) {
    return this.http.get<Patient>(this.url + '/user/patient/'+id, {withCredentials: true});
  }

  getPatients() {
    return this.http.get<PatientDTO[]>(this.url + '/user/patient/0', {withCredentials: true})
  }

  getAddress(id: Number) {
    return this.http.get<Address[]>(this.url + '/user/address/'+id, {withCredentials: true});
  }
}
