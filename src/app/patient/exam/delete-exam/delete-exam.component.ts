import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '../../patient-service';

@Component({
  selector: 'app-delete-exam',
  templateUrl: './delete-exam.component.html',
  styleUrls: ['./delete-exam.component.css']
})
export class DeleteExamComponent implements OnInit {
  @Input() id!: number;
  @Output() onDelete = new EventEmitter();
  constructor(
    public dialog: MatDialog,
    private patienteService: PatientService
  ) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(DeleteExamDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteExam();
      }
    });
  }
  deleteExam(){
    this.patienteService.deleteExam(this.id).subscribe(() => {
      alert('Consulta deletada');
      this.onDelete.emit();
    });
  }
}
@Component({
  selector: 'delete-exam-dialog',
  templateUrl: 'delete-exam-dialog.html',
})
export class DeleteExamDialog {}
