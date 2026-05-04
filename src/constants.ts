import { Doctor } from './types';

export const HOSPITAL_NAME = "Divyam Hospital";
export const HOSPITAL_TAGLINE = "MULTI-SPECIALITY HEALTHCARE";
export const HOSPITAL_ADDRESS = "10-A Mahabalipuram, Nokha Road, Gangashahar, Bikaner, Rajasthan – 334401";
export const HOSPITAL_PHONE = "+91-9413912974";
export const EMERGENCY_PHONE = "+91-8197353157";

export const DOCTORS: Doctor[] = [
  {
    id: "dr-mg-choudhary",
    name: "Dr. MG Choudhary",
    role: "doctor",
    specialty: "Pediatrician",
    experience: "15+ years",
    timing: "5 PM – 9 PM",
    sundayTiming: "11 AM – 4 PM",
    fee: 150,
    mobile: "9413912974"
  },
  {
    id: "dr-shahana-chandad",
    name: "Dr. Shahana Chandad",
    role: "doctor",
    specialty: "Gynecologist & Obstetrician",
    experience: "12+ years",
    timing: "10 AM – 2 PM",
    sundayTiming: "ON CALL",
    fee: 200,
    mobile: "9413912975"
  },
  {
    id: "dr-nisha-choudhary",
    name: "Dr. Nisha Choudhary",
    role: "doctor",
    specialty: "Dentist",
    experience: "10+ years",
    timing: "11 AM – 4 PM",
    sundayTiming: "OFF",
    fee: 200,
    mobile: "8197353157"
  },
  {
    id: "dr-rahul-gahlot",
    name: "Dr. Rahul Gahlot",
    role: "doctor",
    specialty: "Dental Surgeon",
    experience: "8+ years",
    timing: "4 PM - 8 PM",
    sundayTiming: "OFF",
    fee: 200,
    mobile: "9413912976"
  },
  {
    id: "dr-ashish-dadhich",
    name: "Dr. Ashish Dadhich",
    role: "doctor",
    specialty: "General Physician",
    experience: "12+ years",
    timing: "10 AM – 2 PM & 5 PM – 7 PM",
    sundayTiming: "Wednesday: 5 PM – 7 PM only",
    fee: 200,
    mobile: "9988776655"
  }
];

export const HOSPITAL_STATS = [
  { label: 'Happy Patients', value: '5,000+', icon: 'users' },
  { label: 'Specialists', value: '7+', icon: 'award' },
  { label: 'Emergency', value: '24/7', icon: 'clock' },
  { label: 'Avg Response', value: '8min', icon: 'zap' }
];

export const SUBDOMAINS = [
  { id: 'pediatrician', title: 'Pediatrician Panel', path: '/pediatrician' },
  { id: 'dentist', title: 'Dentist Panel', path: '/dentist' },
  { id: 'physician', title: 'Physician Panel', path: '/physician' },
  { id: 'lab', title: 'Lab Panel', path: '/lab' },
  { id: 'pharmacy', title: 'Pharmacy Panel', path: '/pharmacy' },
  { id: 'admin', title: 'Admin Dashboard', path: '/admin' },
  { id: 'ipd', title: 'IPD System', path: '/ipd' },
];
