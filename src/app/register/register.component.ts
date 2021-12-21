import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Medic, Address, Person, User, MedicRegister} from '../shared/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('Cassia Pereira', Validators.maxLength(200)),
      email: new FormControl('voce@gmail.com', Validators.email),
      cpf: new FormControl(),
      birt_date: new FormControl(),
      password: new FormControl(),
      crm: new FormControl(),
      address: new FormControl(),
      number: new FormControl(),
      zipcode: new FormControl()
    });
  }

  getMedic(): MedicRegister {
    let person : Person = {
      name: this.form.get('name')?.value,
      cpf: this.form.get('cpf')?.value,
      birt_date: this.form.get('birt_date')?.value,
      civil_state: 'S'
    };

    let user : User = {
      email: this.form.get('email')?.value,
      tipo: "MED",
      password: this.form.get('password')?.value
    };

    let medicInstance : Medic = {
      person: person,
      user: user,
      crm: this.form.get('crm')?.value
    }

    let address: Address = {
      address: this.form.get('address')?.value,
      number: this.form.get('number')?.value,
      zipcode: this.form.get('zipcode')?.value
    };

    let medicsingup: MedicRegister = {
      medic: medicInstance,
      address: address
    }

    return medicsingup;
  }

  onSubmit(): void {
    this.http.post('http://localhost:1024/user/singup/', this.getMedic())
      .subscribe(() => this.router.navigate(['/login']));
  }

}
