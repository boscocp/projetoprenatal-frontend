import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from 'src/app/patient/patient-service';

@Component({
  selector: 'app-delete-ultrassound',
  templateUrl: './delete-ultrassound.component.html',
  styleUrls: ['./delete-ultrassound.component.css']
})
export class DeleteUltrassoundComponent implements OnInit {
  @Input() id!: string;
  @Output() onDelete = new EventEmitter();
  constructor(
    public dialog: MatDialog,
    private patienteService: PatientService
    ) { }
  ngOnInit(): void {

  }

    openDialog() {
      const dialogRef = this.dialog.open(DeleteUltrassoundExamDialog);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteAppointment();
        }
      });
    }

    private deleteAppointment() {
      this.patienteService.deleteUltrassoundExam(parseInt(this.id)).subscribe(() => {
        alert('Ultrassom deletada');
        this.onDelete.emit();
      });
    }
  }
  @Component({
    selector: 'delete-ultrassound-exam-dialog',
    templateUrl: 'delete-ultrassound-exam-dialog.html',
  })
  export class DeleteUltrassoundExamDialog {}
