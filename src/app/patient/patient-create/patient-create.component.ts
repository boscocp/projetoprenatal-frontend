import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient, PatientRegister, Address, User, Person } from '../../shared/interfaces';
import { PatientService } from '../patient-service';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {
  form!: FormGroup;
  kinship: boolean = false;
  hide = true;
  constructor(
    private router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('',Validators.maxLength(200)),
      email: new FormControl('',Validators.email),
      cpf: new FormControl('',Validators.required),
      birt_date: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      kinship: new FormControl(),
      occupation: new FormControl('',Validators.required),
      civil_state: new FormControl(Validators.maxLength(1)),
      address: new FormControl('',Validators.required),
      number: new FormControl('',Validators.required),
      zipcode: new FormControl('',Validators.required)
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

    return patientRegister;
  }

  createPatient(): void {
    this.patientService.createPatient(this.getPatient())
      .subscribe((res: any) => {
        this.router.navigate(['/']).finally(() => window.location.reload());
        alert('Paciente criado com sucesso');
      });
  }

}
