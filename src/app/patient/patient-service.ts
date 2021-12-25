import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { Appointment } from './ipatient';

@Injectable({ providedIn: 'root' })
export class PatientService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  appointmentById(id: Number) {
    return this.http.get<Appointment[]>(this.url + '/user/appointment/'+id,{withCredentials: true});
  }

}
