import { Component,Inject, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PatientService } from '../patient-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TokenService } from 'src/app/core/token/token.service';

export interface DialogData {
  confirmation: string;
  name: string;
}

@Component({
  selector: 'app-patient-delete',
  templateUrl: './patient-delete.component.html',
  styleUrls: ['./patient-delete.component.css']
})
export class PatientDeleteComponent implements OnInit {
  @Input() id!: number;
  @Output() onDelete = new EventEmitter();
  user!: string;
  confirmation: string = 'deletar';

  constructor(
    private patienteService: PatientService,
    public dialog: MatDialog,
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PatientDeleteDialog, {
      width: '450px',
      data: {name: this.user, confirmation: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(this.confirmation === result) {
        this.deletePatient();
      }
    });
  }

  deletePatient(): void {
    this.patienteService.deletePatient(Number(this.id)).subscribe(()=>{
      alert('Paciente deletado');
      this.onDelete.emit();
    });
  }

}

@Component({
  selector: 'patient-delete-dialog',
  templateUrl: 'patient-delete-dialog.html',
})
export class PatientDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<PatientDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
