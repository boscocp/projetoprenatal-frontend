import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '../../patient-service';

@Component({
  selector: 'app-delete-medical-record',
  templateUrl: './delete-medical-record.component.html',
  styleUrls: ['./delete-medical-record.component.css']
})
export class DeleteMedicalRecordComponent implements OnInit {
  @Input() id!: number;
  @Output() onDelete = new EventEmitter();
  constructor(
    public dialog: MatDialog,
    private patienteService: PatientService
    ) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(DeleteMedicalRecordDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAppointment();
      }
    });
  }

  private deleteAppointment() {
    this.patienteService.deleteAppointment(this.id).subscribe(() => {
      alert('Consulta deletada');
      this.onDelete.emit();
    });
  }
}
@Component({
  selector: 'delete-medical-record',
  templateUrl: 'delete-medical-record.html',
})
export class DeleteMedicalRecordDialog {}
