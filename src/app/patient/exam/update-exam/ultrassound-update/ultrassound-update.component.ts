import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/patient/patient-service';
import { Exam, UltrassoundExam } from 'src/app/shared/interfaces';

export interface DialogData {
  ultrassound: UltrassoundExam;
  name: string;
}

@Component({
  selector: 'app-ultrassound-update',
  templateUrl: './ultrassound-update.component.html',
  styleUrls: ['./ultrassound-update.component.css']
})
export class UltrassoundUpdateComponent implements OnInit {

  @Input() ultrassound!: UltrassoundExam;
  @Input() patientName!: string;
  @Output() onUpdate = new EventEmitter();
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UltrassoundUpdateDialog, {
      width: '500px',
      data: {
        ultrassound: this.ultrassound,
        name: this.patientName
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onUpdate.emit();
    });
  }
}

@Component({
  selector: 'ultrassound-update-dialog',
  templateUrl: 'ultrassound-update-dialog.html',
})
export class UltrassoundUpdateDialog implements OnInit {
  form!: FormGroup;
  patient_id!: string;
  @Output() onUpdate = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    public dialogRef: MatDialogRef<UltrassoundUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  ngOnInit(): void {
    this.patient_id = String(this.route.snapshot.paramMap.get('id'));
    this.form = new FormGroup({
      date : new FormControl('',Validators.required),
      ig: new FormControl('',Validators.maxLength(100)),
      pfe : new FormControl('',Validators.maxLength(200)),
      la : new FormControl('',Validators.maxLength(200)),
      placenta : new FormControl('',Validators.maxLength(200)),
      other_info : new FormControl('',Validators.maxLength(600)),
    });
    this.setForm();
  }

  setForm():void {
    this.form.controls['date'].setValue(this.data.ultrassound.exam?.date);
    this.form.controls['ig'].setValue(this.data.ultrassound.ig);
    this.form.controls['pfe'].setValue(this.data.ultrassound.pfe);
    this.form.controls['la'].setValue(this.data.ultrassound.la);
    this.form.controls['placenta'].setValue(this.data.ultrassound.placenta);
    this.form.controls['other_info'].setValue(this.data.ultrassound.other_info);
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
      patient_id: parseInt(this.patient_id),
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
    this.patientService.updateUltrassoundExam(this.getUltrassoundExam())
      .subscribe((res: any) => {
        alert('Exame atualizado com sucesso');
        window.location.reload()
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
