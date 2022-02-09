import { Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';


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

  constructor(
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm() : FormGroup {
    return new FormGroup({
      selected : new FormControl(),
    });
  }
}
