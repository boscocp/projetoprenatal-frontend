import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient, PatientRegister, Address, User, Person } from '../../shared/interfaces';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {
  form!: FormGroup;
  kinship: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("",Validators.maxLength(200)),
      email: new FormControl("",Validators.email),
      cpf: new FormControl(),
      birt_date: new FormControl(),
      password: new FormControl(),
      kinship: new FormControl(),
      occupation: new FormControl(),
      civil_state: new FormControl(Validators.maxLength(1)),
      address: new FormControl(),
      number: new FormControl(),
      zipcode: new FormControl()
    });
  }

  getPatient() : PatientRegister {
    let person : Person = {
      name: this.form.get('name')?.value,
      cpf: this.form.get('cpf')?.value,
      birt_date: this.form.get('birt_date')?.value,
      civil_state: this.form.get('civil_state')?.value
    };

    let user : User = {
      email: this.form.get('email')?.value,
      tipo: "PAT",
      password: this.form.get('password')?.value
    };

    let patientInstance : Patient = {
      person: person,
      user: user,
      occupation: this.form.get('occupation')?.value,
      kinship: this.kinship
    }

    let address: Address = {
      address: this.form.get('address')?.value,
      number: this.form.get('number')?.value,
      zipcode: this.form.get('zipcode')?.value
    };

    let patientRegister: PatientRegister = {
      patient: patientInstance,
      address: address
    }

    console.log(patientRegister);

    return patientRegister;
  }

  onSubmit(): void {
    this.http.post('http://localhost:1024/user/patient/', this.getPatient(), {withCredentials: true})
      .subscribe((res: any) => { console.log(res),
        this.router.navigate(['/'])
      });
  }

}
