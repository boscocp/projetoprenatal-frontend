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
  id?: string;
  person: Person;
  user: User;
  occupation: string;
  kinship: boolean;
}

export interface Prenatal {
  id?: string;
  patient: Patient;
  created?: Date;
  start_date?: Date;
  last_menstrual_period?: Date;
  ultrasound_gestational_start?: Date;
  don?: string;
  dopp?: string;
  dopa?: string;
  dg?: string;
  dcc?: string;
}

export interface PrenatalDTO {
  id?: string;
  start_date?: Date;
  last_menstrual_period?: Date;
  ultrasound_gestational_start?: string;
  don?: string;
  dopp?: string;
  dopa?: string;
  dg?: string;
  dcc?: string;
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
  id?: string;
  weight?: number;
  date: Date;
  ig?: string;
  pa?: string;
  edema?: string;
  au?: string;
  bcf?: string;
  complication?: string;
  cd?: string;
  substance_use?: string;
}
export interface Exam {
  id?: string;
  name?: string;
  date?: Date;
}

export interface NumericExam {
  id?: string;
  patient_id?: number;
  exam?: Exam;
  value?: number;
}

export interface ReagetExam {
  id?: string;
  patient_id?: number;
  exam?: Exam;
  value?: string;
}
export interface OtherExam {
  id?: string;
  patient_id?: number;
  exam?: Exam;
  value?: string;
}
