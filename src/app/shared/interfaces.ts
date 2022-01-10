export interface User {
  email: string;
  tipo: string;
  password?: string;
}

export interface Person {
  name: string;
  cpf: string;
  birt_date: Date;
  civil_state: string
}

export interface Address {
  address: string;
  number: string;
  zipcode: string;
}

export interface Medic {
  person: Person;
  user: User;
  crm: string;
}

export interface Patient {
  person: Person;
  user: User;
  occupation: string;
  kinship: boolean;
}

export interface PatientRegister {
  patient: Patient;
  address: Address;
}

export interface PatientDTO {
  id: string;
  name: string;
  cpf: string;
  birt_date: string;
  email: string;
}

export interface AppointmentRegister {
  patient_id?: string;
  appointment?: Appointment;
}

export interface MedicRegister {
  medic: Medic;
  address: Address;
}

export interface Appointment {
  id?: string,
  weight?: number,
  date: Date,
  ig?: string,
  pa?: string,
  edema?: string,
  av?: string,
  bcf?: string,
  complication?: string,
  cd?: string,
  substance_use?: string
}
