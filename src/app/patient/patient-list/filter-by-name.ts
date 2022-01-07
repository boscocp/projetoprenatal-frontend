import { Pipe, PipeTransform } from '@angular/core';
import {PatientDTO } from 'src/app/shared/interfaces';


@Pipe({name:'filterByName'})
export class FilterByName implements PipeTransform{

    transform(patients: PatientDTO[], nameQuery: string) {
        nameQuery = nameQuery.trim().toLowerCase();
        if(nameQuery) {
            return patients.filter(patient => patient.name.toLowerCase().includes(nameQuery));
        } else {
            return patients;
        }
    }
}
