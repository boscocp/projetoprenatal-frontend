import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/patient/patient-service';
import { Exam, NumericExam, OtherExam, ReagetExam } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-other-exam',
  templateUrl: './other-exam.component.html',
  styleUrls: ['./other-exam.component.css']
})
export class OtherExamComponent implements OnInit {
  @Input() formIn!: FormGroup;
  form!: FormGroup;
  @Input() patientName!: string;
  patient_id!: number;
  reagent_options = [
    {key: 'R', label: 'Reagente'},
    {key: 'NR', label: 'Não reagente'}
  ]
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
      //name: new FormControl('',Validators.maxLength(10)),
      date : new FormControl('',Validators.required),
      value: new FormControl('',Validators.required),
      selected : new FormControl(),
      reagent : new FormControl(),
    });
  }
  getExam(): Exam {
    let name = this.form.get('selected')?.value==='other'?
      this.form.get('name')?.value : this.formIn.get('selected')?.value;
    let exam : Exam = {
      name: name,
      date: this.form.get('date')?.value
    };
    return exam;
  }
  getNumericExam(): NumericExam {
    let numeric : NumericExam ={
      patient_id: this.patient_id,
      exam: this.getExam(),
      value: parseFloat(this.form.get('value')?.value)
    };

    return numeric;
  }

  getReagentExam(): ReagetExam {
    let reagent : ReagetExam ={
      patient_id: this.patient_id,
      exam: this.getExam(),
      value: this.form.get('reagent')?.value
    };
    console.log(reagent)
    return reagent;
  }
  getOtherExam(): OtherExam {
    let other : OtherExam ={
      patient_id: this.patient_id,
      exam: this.getExam(),
      value: this.form.get('value')?.value
    };
    return other;
  }
  createNumericExam(): void {
    this.patientService.createNumericExam(this.getNumericExam())
      .subscribe((res: any) => {
        alert('Exame criado com sucesso');
      });
  }

  createReagentExam(): void {
    this.patientService.createReagentExam(this.getReagentExam())
      .subscribe((res: any) => {
        alert('Exame criado com sucesso');
      });
  }

  createOtherExam(): void {
    this.patientService.createOtherExam(this.getOtherExam())
      .subscribe((res: any) => {
        alert('Exame criado com sucesso');
        window.location.reload()
      });
  }

  createExam(): void {
    this.createOtherExam();
  }

}
