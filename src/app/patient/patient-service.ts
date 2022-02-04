import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { Address, Appointment, AppointmentRegister, NumericExam, OtherExam, Patient, PatientDTO, PatientRegister, Prenatal, PrenatalDTO, ReagetExam } from '../shared/interfaces';

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

  createAppointment(appointment: AppointmentRegister) {
    return this.http.post(this.url + '/user/appointment/', appointment, {withCredentials: true});
  }

  deleteAppointment(id: Number) {
    return this.http.delete(this.url + '/user/appointment/'+id, {withCredentials: true});
  }

  updateAppointment(appointment: Appointment) {
    return this.http.put(this.url + '/user/appointment/'+ appointment.id, appointment, {withCredentials: true});
  }

  createPatient(patient: PatientRegister) {
    return this.http.post(this.url + '/user/patient/', patient, {withCredentials: true});
  }

  getPatient(id: Number) {
    return this.http.get<Patient>(this.url + '/user/patient/'+id, {withCredentials: true});
  }

  getPrenatal(id: Number) {
    return this.http.get<Prenatal>(this.url + '/user/prenatal/'+id, {withCredentials: true});
  }

  getPatients() {
    return this.http.get<PatientDTO[]>(this.url + '/user/patient/0', {withCredentials: true})
  }

  getAddress(id: Number) {
    return this.http.get<Address[]>(this.url + '/user/address/'+id, {withCredentials: true});
  }

  deletePatient(id: Number) {
    return this.http.delete(this.url + '/user/patient/'+id, {withCredentials: true});
  }

  updatePatient(id: Number, patient: PatientRegister) {
    return this.http.put(this.url + '/user/patient/'+id, patient, {withCredentials: true});
  }

  createNumericExam(exam : NumericExam) {
    return this.http.post(this.url + '/user/numericexam/', exam, {withCredentials: true});
  }

  createReagentExam(exam : ReagetExam) {
    return this.http.post(this.url + '/user/reagentexam/', exam, {withCredentials: true});
  }

  createOtherExam(exam : OtherExam) {
    return this.http.post(this.url + '/user/otherexam/', exam, {withCredentials: true});
  }

  getExams(id: Number){
    return this.http.get<OtherExam[]>(this.url + '/user/otherexam/'+id, {withCredentials: true});
  }

  deleteExam(id: Number){
    return this.http.delete(this.url + '/user/otherexam/'+id, {withCredentials: true});
  }

  updatePrenatal(prenatal: PrenatalDTO){
    return this.http.put(this.url + '/user/prenatal/'+prenatal.id, prenatal, {withCredentials: true});
  }
}
