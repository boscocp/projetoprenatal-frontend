import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UltrassoundExam } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-ultrassounds',
  templateUrl: './ultrassounds.component.html',
  styleUrls: ['./ultrassounds.component.css']
})
export class UltrassoundsComponent implements OnInit {
  @Input() patientName!: string;
  @Input() ultrassounds: UltrassoundExam[] = [];
  //rows= new MatTableDataSource<UltrassoundExam>();
  @Output() onReload = new EventEmitter();
  displayedColumns: string[] = ['name', 'value', 'date','ig','pfe','la','placenta','other_info','delete'];
  constructor() { }

  ngOnInit(): void {
    //this.rows.data = this.ultrassounds;
  }

  needReload() {
    this.onReload.emit();
  }
}
