export type UserRole = 
  | 'admin' 
  | 'doctor' 
  | 'receptionist' 
  | 'nurse' 
  | 'lab_technician' 
  | 'pharmacist' 
  | 'patient';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  mobile: string;
  opdNumber?: string;
  specialty?: string;
  experience?: string;
}

export interface Doctor extends User {
  timing: string;
  fee: number;
  sundayTiming?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: 'opd' | 'emergency' | 'followup';
}

export interface IPDRecord {
  id: string;
  patientId: string;
  bedNumber: string;
  admissionDate: string;
  diagnosis: string;
  treatmentLogs: string[];
  status: 'admitted' | 'discharged';
}

export interface LabReport {
  id: string;
  patientId: string;
  testName: string;
  resultDate: string;
  fileUrl?: string; // Simulation
  findings: string;
}

export interface PharmacyOrder {
  id: string;
  patientId: string;
  medicines: { name: string; dosage: string; quantity: number }[];
  totalAmount: number;
  date: string;
  status: 'pending' | 'delivered';
}
