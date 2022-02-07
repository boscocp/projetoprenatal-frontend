import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Appointment, Addendum, AddendumUpdate } from 'src/app/shared/interfaces';
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
      width: '500px',
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

  ngOnInit(): void {
    this.form = new FormGroup({
      info : new FormControl('',Validators.maxLength(200)),
    });
  }


  getAddendum() {
    const addendum: Addendum = {
      info: this.form.get('info')?.value,
    }
    const addendumUpdate: AddendumUpdate ={
      appointment_id: this.data.appointment.id,
      addendum: addendum,
    }
    console.log(addendumUpdate)
    return addendumUpdate;
  }

  updateAppointment(): void {
    this.patienteService.updateAppointment(this.getAddendum()).subscribe(()=>{
      alert('Paciente atualizado');
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
