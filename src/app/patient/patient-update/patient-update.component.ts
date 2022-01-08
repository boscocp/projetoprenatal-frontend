import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, Patient, PatientRegister, Person, User } from 'src/app/shared/interfaces';
import { PatientService } from '../patient-service';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.css']
})
export class PatientUpdateComponent implements OnInit, AfterViewInit {
  patient!: Patient;
  address!: Address;
  addresses: Address[]=[];
  id: number = 1;
  form!: FormGroup;
  kinship: boolean = false;
  hide = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
    ) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    this.initForm();
    this.getPatient();
  }
  initForm() {
    this.form = new FormGroup({
      name: new FormControl('',Validators.maxLength(200)),
      email: new FormControl('',Validators.email),
      cpf: new FormControl('',Validators.required),
      birt_date: new FormControl('',Validators.required),
      password: new FormControl(),
      kinship: new FormControl(),
      occupation: new FormControl('',Validators.required),
      civil_state: new FormControl(Validators.maxLength(1)),
      address: new FormControl('',Validators.required),
      number: new FormControl('',Validators.required),
      zipcode: new FormControl('',Validators.required)
    });
  }

  getPatient() {
    this.patientService.getPatient(this.id)
    .subscribe((res: Patient) => {
      this.form.controls['name'].setValue(res.person.name);
      this.form.controls['email'].setValue(res.user.email);
      this.form.controls['cpf'].setValue(res.person.cpf);
      this.form.controls['birt_date'].setValue(res.person.birt_date);
      this.form.controls['kinship'].setValue(res.kinship);
      this.form.controls['occupation'].setValue(res.occupation);
      this.form.controls['civil_state'].setValue(res.person.civil_state);
    });

    this.patientService.getAddress(this.id)
    .subscribe((res: Address[]) => {
      this.form.controls['address'].setValue(res[0].address);
      this.form.controls['number'].setValue(res[0].number);
      this.form.controls['zipcode'].setValue(res[0].zipcode);
    });
  }

  getPatientFromForm() : PatientRegister {
    let person : Person = {
      name: this.form.get('name')?.value,
      cpf: this.form.get('cpf')?.value,
      birt_date: this.form.get('birt_date')?.value,
      civil_state: this.form.get('civil_state')?.value
    };
    let pass = this.form.get('password')?.value
    let user : User = {
      email: this.form.get('email')?.value,
      tipo: "PAT"
    };
    if (pass) {
      user.password = pass;
    }

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
  updatePatient(): void {
    this.patientService.updatePatient(this.id, this.getPatientFromForm())
      .subscribe((res: any) => {
        this.router.navigate(['/patient/detail/'+this.id]).finally(() => window.location.reload());
        alert('Paciente atualizado com sucesso');
      });
  }

}
