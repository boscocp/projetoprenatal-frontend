import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { Addendum, AddendumUpdate, Address, Appointment, AppointmentRegister, NumericExam, OtherExam, Patient, PatientDTO, PatientRegister, Prenatal, PrenatalDTO, ReagetExam, UltrassoundExam } from '../shared/interfaces';

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

  // updateAppointment(appointment: Appointment) {
  //   return this.http.put(this.url + '/user/appointment/'+ appointment.id, appointment, {withCredentials: true});
  // }

  updateAppointment(addendumUpdate: AddendumUpdate) {
    return this.http.post(this.url + '/user/addendum/', addendumUpdate, {withCredentials: true});
  }

  getAddemdums(appointment_id: Number){
    return this.http.get<Addendum[]>(this.url + '/user/addendum/'+appointment_id, {withCredentials: true})
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

  createUltrassoundExam(exam : UltrassoundExam) {
    return this.http.post(this.url + '/user/ultrassound/', exam, {withCredentials: true});
  }

  getUltrassounds(patient_id: Number) {
    return this.http.get<OtherExam[]>(this.url + '/user/ultrassound/'+patient_id, {withCredentials: true});
  }

  deleteUltrassoundExam(id: Number){
    return this.http.delete(this.url + '/user/ultrassound/'+id, {withCredentials: true});
  }

  updateUltrassoundExam(exam: UltrassoundExam) {
    return this.http.put(this.url + '/user/ultrassound/'+exam.id, exam, {withCredentials: true});
  }

  deleteExam(id: Number){
    return this.http.delete(this.url + '/user/otherexam/'+id, {withCredentials: true});
  }

  updatePrenatal(prenatal: PrenatalDTO){
    return this.http.put(this.url + '/user/prenatal/'+prenatal.id, prenatal, {withCredentials: true});
  }
}
