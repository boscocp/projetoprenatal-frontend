export interface User {
  email: string;
  tipo: string;
  password: string;
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

export interface MedicRegister {
  medic: Medic;
  address: Address;
}
