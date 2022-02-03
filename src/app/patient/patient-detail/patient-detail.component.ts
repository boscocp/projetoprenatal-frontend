import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address, Patient, Prenatal } from 'src/app/shared/interfaces';
import { PatientService } from '../patient-service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
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
    private patientService: PatientService
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
      const timeDiff = Math.abs(today.getDate() - dum.getDate())+this.daysInMonth(today.getMonth()+1, today.getFullYear());
      return [Math.floor(timeDiff / 7),timeDiff % 7];
    }
    return [0,0];
  }

  daysInMonth (month: number, year:number) : number {
    return new Date(year, month, 0).getDate();
  }
}
