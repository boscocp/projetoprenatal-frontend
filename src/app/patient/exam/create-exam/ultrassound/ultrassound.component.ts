import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/patient/patient-service';
import { Exam, UltrassoundExam } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-ultrassound',
  templateUrl: './ultrassound.component.html',
  styleUrls: ['./ultrassound.component.css']
})
export class UltrassoundComponent implements OnInit {
  form!: FormGroup;
  patient_id!: number;
  constructor(
    public patientService: PatientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.patient_id = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.initForm();
  }

  initForm() : FormGroup {
    return new FormGroup({
      date : new FormControl('',Validators.required),
      ig: new FormControl('',Validators.maxLength(100)),
      pfe : new FormControl('',Validators.maxLength(200)),
      la : new FormControl('',Validators.maxLength(200)),
      placenta : new FormControl('',Validators.maxLength(200)),
      other_info : new FormControl('',Validators.maxLength(600)),
    });
  }

  getExam(): Exam {
    let exam : Exam = {
      name: 'ultrassound',
      date: this.form.get('date')?.value
    };
    return exam;
  }

  getUltrassoundExam(): UltrassoundExam {
    let other : UltrassoundExam ={
      patient_id: this.patient_id,
      exam: this.getExam(),
      ig: this.form.get('ig')?.value,
      pfe : this.form.get('pfe')?.value,
      la : this.form.get('la')?.value,
      placenta : this.form.get('placenta')?.value,
      other_info : this.form.get('other_info')?.value,
    };
    return other;
  }

  createExam(): void {
    this.patientService.createUltrassoundExam(this.getUltrassoundExam())
      .subscribe((res: any) => {
        alert('Exame criado com sucesso');
        window.location.reload()
      });
  }

}
