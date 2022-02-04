import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Address, Patient, Prenatal, PrenatalDTO } from 'src/app/shared/interfaces';
import { PatientService } from '../patient-service';
export interface DialogData {
  prenatal: PrenatalDTO;
  name: string;
}
@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  @Output() onUpdate = new EventEmitter();
  patient!: Patient;
  prenatal!: Prenatal;
  name = '';
  address!: Address;
  addresses: Address[]=[];
  age: Number = 1;
  weekGestationaAgeUS: Number = 0;
  dayGestationaAgeUS: Number = 1;
  weekGestationaAgeLastPeriod: Number = 0;
  dayGestationaAgeLastPeriod: Number = 1;
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.patientService.getPrenatal(Number(this.route.snapshot.paramMap.get('id')))
    .subscribe((res: Prenatal) => {
      this.name = res.patient.person.name;
      this.prenatal = res;
      this.patient = res.patient;
      this.age =  this.ageCalculator(this.patient.person.birt_date)
      let aux: number[] = this.gestationalWeekCalculator(res.last_menstrual_period);
      this.weekGestationaAgeLastPeriod = aux[0];
      this.dayGestationaAgeLastPeriod = aux[1];
      let aux2: number[] = this.gestationalWeekCalculator(res.ultrasound_gestational_start);
      this.weekGestationaAgeUS = aux2[0];
      this.dayGestationaAgeUS = aux2[1]
    });
  }

  ageCalculator(date: Date) : Number{
    if(date){
      const convertAge = new Date(date);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
    return 0;
  }

  gestationalWeekCalculator(date: any): number[]{
    if(date){
      const dum = new Date(date);
      const today = new Date(Date.now());
      const timeDiff = Math.abs(today.getTime()- dum.getTime());
      const weeks = Math.floor(timeDiff/(1000*60*60*24*7));
      const days = Math.floor((today.getTime()-dum.getTime())/(1000*60*60*24))-(weeks*7); //testar
      return [weeks, days];//6 dias ta mudando
    }
    return [0,0];
  }

  // gestationaAgeUSCalculator(date: any): number[] {
  //   if(date){
  //     let today = new Date(Date.now());
  //     const weeks = Math.abs((date.getTime() - today.getTime()) / (7 * 24 * 60 * 60 * 1000));
  //     const timeDiff = Math.abs(today.getDate() - date.getDate());
  //     return [weeks,];
  //   }
  //   return [0,0];
  // }


  daysInMonth (month: number, year:number) : number {
    return new Date(year, month, 0).getDate();
  }
  updatePrenatalD(){

  }
  updatePrenatalIG(){

  }

  openDDialog(): void {
    const dialogRef = this.dialog.open(PrenatalDUpdateDialog, {
      width: '450px',
      data: {
        prenatal: this.prenatal,
        name: this.name
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onUpdate.emit();
    });
  }

  openIGDialog(): void {
    const dialogRef = this.dialog.open(PrenatalIGUpdateDialog, {
      width: '450px',
      data: {
        prenatal: this.prenatal,
        name: this.name
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onUpdate.emit();
    });
  }
}

@Component({
  selector: 'prenatal-d-update-dialog',
  templateUrl: 'prenatal-d-update-dialog.html',
})
export class PrenatalDUpdateDialog implements OnInit {
  form!: FormGroup;
  @Output() onUpdate = new EventEmitter();

  constructor(
    private patienteService: PatientService,
    public dialogRef: MatDialogRef<PrenatalDUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  setForm():void {
    this.form.controls['don'].setValue(this.data.prenatal.don);
    this.form.controls['dopp'].setValue(this.data.prenatal.dopp);
    this.form.controls['dopa'].setValue(this.data.prenatal.dopa);
    this.form.controls['dg'].setValue(this.data.prenatal.dg);
    this.form.controls['dcc'].setValue(this.data.prenatal.dcc);
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      don : new FormControl('',Validators.maxLength(80)),
      dopp : new FormControl('',Validators.maxLength(80)),
      dopa : new FormControl('',Validators.maxLength(80)),
      dg : new FormControl('',Validators.maxLength(80)),
      dcc : new FormControl('',Validators.maxLength(80)),
    });
    this.setForm();
  }


  getPrenatal() : PrenatalDTO {
    return this.data.prenatal = {
      id: this.data.prenatal.id,
      don: this.form.get('don')?.value,
      dopp: this.form.get('dopp')?.value,
      dopa: this.form.get('dopa')?.value,
      dg: this.form.get('dg')?.value,
      dcc: this.form.get('dcc')?.value,
    }
  }

  updatePrenatal(): void {
    this.patienteService.updatePrenatal(this.getPrenatal()).subscribe(()=>{
      alert('Paciente atualizado');
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'prenatal-ig-update-dialog',
  templateUrl: 'prenatal-ig-update-dialog.html',
})
export class PrenatalIGUpdateDialog implements OnInit {
  form!: FormGroup;
  @Output() onUpdate = new EventEmitter();

  constructor(
    private patienteService: PatientService,
    public dialogRef: MatDialogRef<PrenatalIGUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  setForm():void {
    this.form.controls['last_menstrual_period'].setValue(this.data.prenatal.last_menstrual_period);
    //this.form.controls['ultrasound_gestational_start'].setValue(this.data.prenatal.ultrasound_gestational_start);
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      last_menstrual_period : new FormControl('',Validators.maxLength(80)),
      days : new FormControl('',Validators.maxLength(2)),
      weeks : new FormControl('',Validators.maxLength(2)),
      examDate : new FormControl(),
    });
    this.setForm();
  }

  getDateUS(date: Date, weeks: number, days: number) : Date {
    let examDate = new Date(date);
    const ig = new Date(examDate.setDate(examDate.getDate()-days-(weeks*7)+1));
    return ig;
  }

  getPrenatal() : PrenatalDTO {
    let examDate : Date;
    if(this.form.get('weeks')?.value || this.form.get('days')?.value || this.form.get('examDate')?.value){
      examDate = this.getDateUS(this.form.get('examDate')?.value,
        this.form.get('weeks')?.value,this.form.get('days')?.value);
        return this.data.prenatal = {
          id: this.data.prenatal.id,
          last_menstrual_period: this.form.get('last_menstrual_period')?.value,
          ultrasound_gestational_start: examDate.toISOString().split('T')[0]
        }
    }else {
      return this.data.prenatal = {
        id: this.data.prenatal.id,
        last_menstrual_period: this.form.get('last_menstrual_period')?.value
      }
    }
  }

  updatePrenatal(): void {
    console.log(this.getPrenatal())
    this.patienteService.updatePrenatal(this.getPrenatal()).subscribe(()=>{
      alert('Paciente atualizado');
      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
