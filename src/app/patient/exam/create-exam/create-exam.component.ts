import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Exam, NumericExam, OtherExam, ReagetExam } from 'src/app/shared/interfaces';
import { PatientService } from '../../patient-service';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  form!: FormGroup;
  @Input() patientName!: string;
  patient_id!: number;
  options = [
    { key: 'ABO-RH', label: 'ABO-RH' },
    { key: 'Glicemia', label: 'Glicemia de Jejum' },
    { key: 'TOTG', label: 'Teste Oral Tolerância Glic.' },
    { key: 'Sifilis', label: 'Sífilis (teste rápido)' },
    { key: 'VDRL', label: 'VDRL' },
    { key: 'HIV', label: 'HIV/Anti-HIV (teste rápido)' },
    { key: 'Hepatite', label: 'Hepatite B-HBsAg' },
    { key: 'Toxoplasmose', label: 'Toxoplasmose' },
    { key: 'Hemog', label: 'Hemog. Hematócrito' },
    { key: 'Urina-EAS', label: 'Urina-EAS' },
    { key: 'Urina-Cultura', label: 'Urina-Cultura' },
    { key: 'Coombs Ind', label: 'Coombs Indireto' },
    { key: 'Ultrassom', label: 'Ultrassom' },
    //{ key: 'reagent', label: 'Reagente' }
    //{ key: 'numeric', label: 'Numerico' }
    { key: 'other', label: 'Outros' }
  ]

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
      name: new FormControl('',Validators.maxLength(10)),
      date : new FormControl('',Validators.required),
      value: new FormControl('',Validators.required),
      selected : new FormControl(),
      reagent : new FormControl(),
    });
  }
  getExam(): Exam {
    let name = this.form.get('selected')?.value==='other'?
      this.form.get('name')?.value : this.form.get('selected')?.value;
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
    // switch(this.form.get('selected')?.value) {
    //   case 'numeric': {
    //     this.createNumericExam();
    //     break;
    //   }
    //   case 'HIV': {
    //     this.createReagentExam();
    //     break;
    //   }
    //   default: {
    //     this.createOtherExam();
    //     break;
    //   }
    // }
  }

}
