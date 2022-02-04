import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/core/token/token.service';
import { Appointment } from 'src/app/shared/interfaces';
import { PatientService } from '../../patient-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  appointment: Appointment;
  name: string;
}

@Component({
  selector: 'app-update-medical-record',
  templateUrl: './update-medical-record.component.html',
  styleUrls: ['./update-medical-record.component.css']
})
export class UpdateMedicalRecordComponent implements OnInit {
  @Input() appointment!: Appointment;
  @Input() patientName!: string;
  @Output() onUpdate = new EventEmitter();
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AppointmentUpdateDialog, {
      width: '450px',
      data: {
        appointment: this.appointment,
        name: this.patientName
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onUpdate.emit();
    });
  }

}

@Component({
  selector: 'update-medical-record-dialog',
  templateUrl: 'update-medical-record-dialog.html',
})
export class AppointmentUpdateDialog implements OnInit {
  form!: FormGroup;
  @Output() onUpdate = new EventEmitter();

  constructor(
    private patienteService: PatientService,
    public dialogRef: MatDialogRef<AppointmentUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  setForm():void {
    this.form.controls['weight'].setValue(this.data.appointment.weight);
    this.form.controls['date'].setValue(this.data.appointment.date);
    this.form.controls['edema'].setValue(this.data.appointment.edema);
    this.form.controls['ig'].setValue(this.data.appointment.ig);
    this.form.controls['pa'].setValue(this.data.appointment.pa);
    this.form.controls['au'].setValue(this.data.appointment.au);
    this.form.controls['bcf'].setValue(this.data.appointment.bcf);
    this.form.controls['complication'].setValue(this.data.appointment.complication);
    this.form.controls['cd'].setValue(this.data.appointment.cd);
    this.form.controls['substance_use'].setValue(this.data.appointment.substance_use);
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      weight : new FormControl('',Validators.maxLength(3)),
      date : new FormControl('',Validators.required),
      ig : new FormControl('',Validators.maxLength(10)),
      pa : new FormControl('',Validators.maxLength(10)),
      edema : new FormControl('',Validators.maxLength(10)),
      au : new FormControl('',Validators.maxLength(10)),
      bcf : new FormControl('',Validators.maxLength(10)),
      complication : new FormControl('',Validators.maxLength(200)),
      cd : new FormControl('',Validators.maxLength(10)),
      substance_use : new FormControl('',Validators.maxLength(200))
    });
    this.setForm();
  }


  getAppointment() {
    return this.data.appointment = {
      id: this.data.appointment.id,
      weight: this.form.get('weight')?.value,
      date: this.form.get('date')?.value,
      ig: this.form.get('ig')?.value,
      pa: this.form.get('pa')?.value,
      edema: this.form.get('edema')?.value,
      au: this.form.get('au')?.value,
      bcf: this.form.get('bcf')?.value,
      complication: this.form.get('complication')?.value,
      cd: this.form.get('cd')?.value,
      substance_use: this.form.get('substance_use')?.value
    }
  }

  updateAppointment(): void {
    this.patienteService.updateAppointment(this.getAppointment()).subscribe(()=>{
      alert('Paciente atualizado');
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
