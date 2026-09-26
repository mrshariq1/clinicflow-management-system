export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  emergencyContact: string;
  assignedDoctor: string;
  medicalNotes: string;
  lastVisit: string;
  status: 'Active' | 'Pending' | 'Completed' | 'Inactive';
  avatar?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  experience: string;
  availability: string;
  patientsCount: number;
  rating: number;
  phone: string;
  email: string;
  education: string;
  status: 'Available' | 'In Consultation' | 'Off Duty';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'Consultation' | 'Follow-up' | 'Emergency' | 'Routine Checkup';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  notes: string;
  room: string;
}

export interface Department {
  id: string;
  name: string;
  headOfDept: string;
  doctorsCount: number;
  patientsCount: number;
  appointmentsCount: number;
  roomCapacity: number;
  iconName: string;
  description: string;
}

export interface PrescriptionMedicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medicines: PrescriptionMedicine[];
  notes: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  amount: number;
  paymentMethod: 'Cash' | 'Card' | 'Bank Transfer';
  status: 'Paid' | 'Pending' | 'Refunded';
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
  type: 'patient' | 'appointment' | 'invoice' | 'prescription';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'payment' | 'prescription' | 'system';
}

export interface ClinicSettings {
  clinicName: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  taxId: string;
  emailNotifications: boolean;
  appointmentNotifications: boolean;
  billingNotifications: boolean;
  language: string;
  timezone: string;
  currency: string;
}

export const initialDoctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Ahmed',
    specialization: 'Senior Cardiologist',
    department: 'Cardiology',
    experience: '14 years',
    availability: 'Mon, Wed, Fri (09:00 - 15:00)',
    patientsCount: 342,
    rating: 4.9,
    phone: '+1 (555) 234-8901',
    email: 'sarah.ahmed@clinicflow.demo',
    education: 'MD Cardiology, Johns Hopkins University',
    status: 'Available',
  },
  {
    id: 'doc-2',
    name: 'Dr. Hamza Khan',
    specialization: 'General Physician',
    department: 'General Medicine',
    experience: '9 years',
    availability: 'Mon - Thu (10:00 - 17:00)',
    patientsCount: 489,
    rating: 4.8,
    phone: '+1 (555) 345-6789',
    email: 'hamza.khan@clinicflow.demo',
    education: 'MBBS, Internal Medicine Residency, Mayo Clinic',
    status: 'In Consultation',
  },
  {
    id: 'doc-3',
    name: 'Dr. Ayesha Malik',
    specialization: 'Clinical Dermatologist',
    department: 'Dermatology',
    experience: '11 years',
    availability: 'Tue, Thu, Sat (09:30 - 16:30)',
    patientsCount: 278,
    rating: 4.9,
    phone: '+1 (555) 456-7890',
    email: 'ayesha.malik@clinicflow.demo',
    education: 'Dermatology Board Certified, Stanford Medicine',
    status: 'Available',
  },
  {
    id: 'doc-4',
    name: 'Dr. Omar Farooq',
    specialization: 'Consultant Neurologist',
    department: 'Neurology',
    experience: '16 years',
    availability: 'Mon, Wed (11:00 - 18:00)',
    patientsCount: 215,
    rating: 4.7,
    phone: '+1 (555) 567-8901',
    email: 'omar.farooq@clinicflow.demo',
    education: 'MD Neurology, Harvard Medical School',
    status: 'Available',
  },
  {
    id: 'doc-5',
    name: 'Dr. Zoya Rehman',
    specialization: 'Consultant Pediatrician',
    department: 'Pediatrics',
    experience: '8 years',
    availability: 'Mon - Fri (08:30 - 14:30)',
    patientsCount: 390,
    rating: 4.9,
    phone: '+1 (555) 678-9012',
    email: 'zoya.rehman@clinicflow.demo',
    education: 'Pediatric Care Specialist, Boston Children’s Hospital',
    status: 'Available',
  },
  {
    id: 'doc-6',
    name: 'Dr. Tariq Mahmood',
    specialization: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    experience: '15 years',
    availability: 'Tue, Wed, Fri (10:00 - 16:00)',
    patientsCount: 310,
    rating: 4.8,
    phone: '+1 (555) 789-0123',
    email: 'tariq.mahmood@clinicflow.demo',
    education: 'MS Orthopedic Surgery, Oxford University',
    status: 'Off Duty',
  },
];

export const initialPatients: Patient[] = [
  {
    id: 'pat-1',
    name: 'Ahmed Khan',
    age: 34,
    gender: 'Male',
    dob: '1992-04-12',
    phone: '+1 (555) 102-3948',
    email: 'ahmed.khan@example.com',
    address: '742 Evergreen Terrace, Suite 4B',
    bloodGroup: 'O+',
    emergencyContact: 'Fatima Khan (+1 555-102-3949)',
    assignedDoctor: 'Dr. Sarah Ahmed',
    medicalNotes: 'Mild hypertension. Regular cardiac monitoring recommended. Low sodium diet advised.',
    lastVisit: '2026-09-24',
    status: 'Active',
  },
  {
    id: 'pat-2',
    name: 'Sara Malik',
    age: 28,
    gender: 'Female',
    dob: '1998-08-19',
    phone: '+1 (555) 203-4950',
    email: 'sara.malik@example.com',
    address: '124 Elm Street, Apt 12',
    bloodGroup: 'A+',
    emergencyContact: 'Kamran Malik (+1 555-203-4955)',
    assignedDoctor: 'Dr. Hamza Khan',
    medicalNotes: 'Seasonal respiratory allergies. Prescribed anti-histamine course.',
    lastVisit: '2026-09-25',
    status: 'Active',
  },
  {
    id: 'pat-3',
    name: 'Usman Ali',
    age: 45,
    gender: 'Male',
    dob: '1981-11-03',
    phone: '+1 (555) 304-5961',
    email: 'usman.ali@example.com',
    address: '58 Maple Avenue',
    bloodGroup: 'B+',
    emergencyContact: 'Sadia Ali (+1 555-304-5962)',
    assignedDoctor: 'Dr. Omar Farooq',
    medicalNotes: 'Recurrent tension headaches. Normal MRI, stress management advised.',
    lastVisit: '2026-09-20',
    status: 'Active',
  },
  {
    id: 'pat-4',
    name: 'Ayesha Noor',
    age: 31,
    gender: 'Female',
    dob: '1995-02-14',
    phone: '+1 (555) 405-6972',
    email: 'ayesha.noor@example.com',
    address: '890 Pinecrest Blvd',
    bloodGroup: 'AB+',
    emergencyContact: 'Bilal Noor (+1 555-405-6975)',
    assignedDoctor: 'Dr. Ayesha Malik',
    medicalNotes: 'Contact dermatitis treatment ongoing. Follow-up evaluation scheduled.',
    lastVisit: '2026-09-22',
    status: 'Pending',
  },
  {
    id: 'pat-5',
    name: 'Hamza Shah',
    age: 52,
    gender: 'Male',
    dob: '1974-06-30',
    phone: '+1 (555) 506-7983',
    email: 'hamza.shah@example.com',
    address: '312 Oak Ridge Road',
    bloodGroup: 'O-',
    emergencyContact: 'Rehana Shah (+1 555-506-7984)',
    assignedDoctor: 'Dr. Sarah Ahmed',
    medicalNotes: 'Post-angioplasty 6-month routine review. Stable vitals and normal ECG.',
    lastVisit: '2026-09-18',
    status: 'Completed',
  },
  {
    id: 'pat-6',
    name: 'Fatima Zahra',
    age: 24,
    gender: 'Female',
    dob: '2002-10-08',
    phone: '+1 (555) 607-8994',
    email: 'fatima.zahra@example.com',
    address: '414 Cedar Lane',
    bloodGroup: 'A-',
    emergencyContact: 'Zahra Begum (+1 555-607-8995)',
    assignedDoctor: 'Dr. Zoya Rehman',
    medicalNotes: 'Annual wellness checkup and booster immunization updated.',
    lastVisit: '2026-09-15',
    status: 'Active',
  },
  {
    id: 'pat-7',
    name: 'Bilal Tariq',
    age: 39,
    gender: 'Male',
    dob: '1987-03-22',
    phone: '+1 (555) 708-9005',
    email: 'bilal.tariq@example.com',
    address: '901 Sunset Highway',
    bloodGroup: 'B-',
    emergencyContact: 'Asma Tariq (+1 555-708-9006)',
    assignedDoctor: 'Dr. Tariq Mahmood',
    medicalNotes: 'Right knee meniscus strain from sport injury. Physical therapy referral.',
    lastVisit: '2026-09-10',
    status: 'Active',
  },
  {
    id: 'pat-8',
    name: 'Zainab Bibi',
    age: 63,
    gender: 'Female',
    dob: '1963-07-15',
    phone: '+1 (555) 809-0116',
    email: 'zainab.bibi@example.com',
    address: '22 Riverview Drive',
    bloodGroup: 'O+',
    emergencyContact: 'Imran Bibi (+1 555-809-0117)',
    assignedDoctor: 'Dr. Hamza Khan',
    medicalNotes: 'Type 2 diabetes management. HbA1c 6.8%. Diet and medication compliant.',
    lastVisit: '2026-09-05',
    status: 'Active',
  },
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-1',
    patientId: 'pat-1',
    patientName: 'Ahmed Khan',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Ahmed',
    date: '2026-09-26',
    time: '08:30 AM',
    type: 'Consultation',
    status: 'Confirmed',
    notes: 'Cardiac rhythm check and blood pressure review',
    room: 'Room 204 (Cardiology Wing)',
  },
  {
    id: 'apt-2',
    patientId: 'pat-4',
    patientName: 'Ayesha Noor',
    doctorId: 'doc-2',
    doctorName: 'Dr. Hamza Khan',
    date: '2026-09-26',
    time: '10:00 AM',
    type: 'Follow-up',
    status: 'Pending',
    notes: 'Allergy panel evaluation and symptom check',
    room: 'Room 102 (General Medicine)',
  },
  {
    id: 'apt-3',
    patientId: 'pat-2',
    patientName: 'Sara Malik',
    doctorId: 'doc-3',
    doctorName: 'Dr. Ayesha Malik',
    date: '2026-09-26',
    time: '11:15 AM',
    type: 'Consultation',
    status: 'Confirmed',
    notes: 'Skin rash inspection and topical patch testing',
    room: 'Room 305 (Dermatology Suite)',
  },
  {
    id: 'apt-4',
    patientId: 'pat-3',
    patientName: 'Usman Ali',
    doctorId: 'doc-4',
    doctorName: 'Dr. Omar Farooq',
    date: '2026-09-26',
    time: '12:30 PM',
    type: 'Routine Checkup',
    status: 'Completed',
    notes: 'Neurological reflex examination and sleep log review',
    room: 'Room 401 (Neurology Lab)',
  },
  {
    id: 'apt-5',
    patientId: 'pat-5',
    patientName: 'Hamza Shah',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Ahmed',
    date: '2026-09-26',
    time: '02:00 PM',
    type: 'Consultation',
    status: 'Confirmed',
    notes: 'Holter monitor data assessment and exercise plan',
    room: 'Room 204 (Cardiology Wing)',
  },
  {
    id: 'apt-6',
    patientId: 'pat-7',
    patientName: 'Bilal Tariq',
    doctorId: 'doc-6',
    doctorName: 'Dr. Tariq Mahmood',
    date: '2026-09-27',
    time: '09:00 AM',
    type: 'Routine Checkup',
    status: 'Confirmed',
    notes: 'Knee joint mobility test following physical therapy',
    room: 'Room 502 (Orthopedics Wing)',
  },
  {
    id: 'apt-7',
    patientId: 'pat-6',
    patientName: 'Fatima Zahra',
    doctorId: 'doc-5',
    doctorName: 'Dr. Zoya Rehman',
    date: '2026-09-27',
    time: '11:00 AM',
    type: 'Follow-up',
    status: 'Pending',
    notes: 'Follow-up on nutritional iron supplement response',
    room: 'Room 110 (Pediatrics Clinic)',
  },
  {
    id: 'apt-8',
    patientId: 'pat-8',
    patientName: 'Zainab Bibi',
    doctorId: 'doc-2',
    doctorName: 'Dr. Hamza Khan',
    date: '2026-09-28',
    time: '03:30 PM',
    type: 'Emergency',
    status: 'Cancelled',
    notes: 'Rescheduled by patient family to next week',
    room: 'Room 102 (General Medicine)',
  },
];

export const initialDepartments: Department[] = [
  {
    id: 'dep-1',
    name: 'Cardiology',
    headOfDept: 'Dr. Sarah Ahmed',
    doctorsCount: 4,
    patientsCount: 384,
    appointmentsCount: 28,
    roomCapacity: 12,
    iconName: 'HeartPulse',
    description: 'Comprehensive diagnostic, non-invasive cardiology and preventative heart care.',
  },
  {
    id: 'dep-2',
    name: 'Dermatology',
    headOfDept: 'Dr. Ayesha Malik',
    doctorsCount: 3,
    patientsCount: 246,
    appointmentsCount: 19,
    roomCapacity: 8,
    iconName: 'Sparkles',
    description: 'Advanced clinical dermatology, allergy patch evaluations, and dermatologic therapy.',
  },
  {
    id: 'dep-3',
    name: 'Neurology',
    headOfDept: 'Dr. Omar Farooq',
    doctorsCount: 3,
    patientsCount: 182,
    appointmentsCount: 14,
    roomCapacity: 6,
    iconName: 'Brain',
    description: 'Specialized evaluation of central and peripheral neurological disorders and sleep health.',
  },
  {
    id: 'dep-4',
    name: 'General Medicine',
    headOfDept: 'Dr. Hamza Khan',
    doctorsCount: 5,
    patientsCount: 512,
    appointmentsCount: 42,
    roomCapacity: 16,
    iconName: 'Stethoscope',
    description: 'Primary medical consultations, annual wellness assessments, and chronic condition management.',
  },
  {
    id: 'dep-5',
    name: 'Pediatrics',
    headOfDept: 'Dr. Zoya Rehman',
    doctorsCount: 3,
    patientsCount: 320,
    appointmentsCount: 22,
    roomCapacity: 10,
    iconName: 'Baby',
    description: 'Dedicated pediatric care, newborn screenings, and child developmental milestones tracking.',
  },
  {
    id: 'dep-6',
    name: 'Dental Care',
    headOfDept: 'Dr. Rehan Siddiqui',
    doctorsCount: 2,
    patientsCount: 195,
    appointmentsCount: 16,
    roomCapacity: 6,
    iconName: 'Smile',
    description: 'Modern cosmetic and restorative dentistry, preventative cleanings, and oral hygiene.',
  },
  {
    id: 'dep-7',
    name: 'Orthopedics',
    headOfDept: 'Dr. Tariq Mahmood',
    doctorsCount: 3,
    patientsCount: 260,
    appointmentsCount: 18,
    roomCapacity: 8,
    iconName: 'Bone',
    description: 'Joint reconstruction, sports injury rehabilitation, and spinal health consultations.',
  },
];

export const initialPrescriptions: Prescription[] = [
  {
    id: 'rx-1',
    patientId: 'pat-1',
    patientName: 'Ahmed Khan',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Ahmed',
    date: '2026-09-24',
    diagnosis: 'Mild Essential Hypertension & Cardiovascular Risk Reduction',
    medicines: [
      {
        id: 'med-1',
        name: 'Amlodipine Besylate',
        dosage: '5mg',
        frequency: 'Once Daily (Morning)',
        duration: '30 Days',
        instructions: 'Take with water after breakfast. Monitor home BP weekly.',
      },
      {
        id: 'med-2',
        name: 'Atorvastatin Calcium',
        dosage: '10mg',
        frequency: 'Once Daily (Night)',
        duration: '30 Days',
        instructions: 'Take at bedtime. Avoid grapefruit products.',
      },
    ],
    notes: 'Repeat basic metabolic panel and lipid profile in 4 weeks. Maintain low sodium diet.',
  },
  {
    id: 'rx-2',
    patientId: 'pat-2',
    patientName: 'Sara Malik',
    doctorId: 'doc-2',
    doctorName: 'Dr. Hamza Khan',
    date: '2026-09-25',
    diagnosis: 'Acute Seasonal Allergic Rhinitis',
    medicines: [
      {
        id: 'med-3',
        name: 'Levocetirizine Dihydrochloride',
        dosage: '5mg',
        frequency: 'Once Daily (Night)',
        duration: '14 Days',
        instructions: 'Take 1 tablet before sleep. Non-sedating formula.',
      },
      {
        id: 'med-4',
        name: 'Fluticasone Propionate Nasal Spray',
        dosage: '50mcg/actuation',
        frequency: '2 Sprays Each Nostril Once Daily',
        duration: '21 Days',
        instructions: 'Shake well before use. Prime spray before first application.',
      },
    ],
    notes: 'Return if allergic symptoms persist past 2 weeks.',
  },
  {
    id: 'rx-3',
    patientId: 'pat-4',
    patientName: 'Ayesha Noor',
    doctorId: 'doc-3',
    doctorName: 'Dr. Ayesha Malik',
    date: '2026-09-22',
    diagnosis: 'Eczematous Dermatitis (Forearm flexures)',
    medicines: [
      {
        id: 'med-5',
        name: 'Hydrocortisone Butyrate Cream 0.1%',
        dosage: 'Apply Thin Layer',
        frequency: 'Twice Daily',
        duration: '10 Days',
        instructions: 'Apply sparingly to affected areas. Avoid ocular contact.',
      },
      {
        id: 'med-6',
        name: 'Ceramide Moisturizing Emulsion',
        dosage: 'Liberal application',
        frequency: 'Three Times Daily',
        duration: 'Ongoing',
        instructions: 'Apply within 3 minutes after showering for barrier restoration.',
      },
    ],
    notes: 'Patch test reviewed. Keep away from harsh industrial detergents.',
  },
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-1041',
    patientId: 'pat-1',
    patientName: 'Ahmed Khan',
    date: '2026-09-24',
    dueDate: '2026-09-24',
    items: [
      { description: 'Cardiology Specialist Consultation', quantity: 1, rate: 120, amount: 120 },
      { description: '12-Lead Electrocardiogram (ECG)', quantity: 1, rate: 65, amount: 65 },
    ],
    amount: 185,
    paymentMethod: 'Card',
    status: 'Paid',
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-1042',
    patientId: 'pat-2',
    patientName: 'Sara Malik',
    date: '2026-09-25',
    dueDate: '2026-09-25',
    items: [
      { description: 'General Practice Consultation', quantity: 1, rate: 80, amount: 80 },
      { description: 'Complete Blood Count (CBC) Panel', quantity: 1, rate: 45, amount: 45 },
    ],
    amount: 125,
    paymentMethod: 'Cash',
    status: 'Paid',
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-1043',
    patientId: 'pat-3',
    patientName: 'Usman Ali',
    date: '2026-09-26',
    dueDate: '2026-10-03',
    items: [
      { description: 'Neurology Consultation & Reflex Battery', quantity: 1, rate: 150, amount: 150 },
    ],
    amount: 150,
    paymentMethod: 'Bank Transfer',
    status: 'Pending',
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV-1044',
    patientId: 'pat-4',
    patientName: 'Ayesha Noor',
    date: '2026-09-22',
    dueDate: '2026-09-22',
    items: [
      { description: 'Dermatological Evaluation & Patch Test', quantity: 1, rate: 140, amount: 140 },
      { description: 'Topical Barrier Medication Formulation', quantity: 1, rate: 35, amount: 35 },
    ],
    amount: 175,
    paymentMethod: 'Card',
    status: 'Paid',
  },
  {
    id: 'inv-5',
    invoiceNumber: 'INV-1045',
    patientId: 'pat-5',
    patientName: 'Hamza Shah',
    date: '2026-09-26',
    dueDate: '2026-10-05',
    items: [
      { description: 'Holter 24h Cardiac Rhythm Analysis', quantity: 1, rate: 220, amount: 220 },
      { description: 'Follow-up Consultation', quantity: 1, rate: 75, amount: 75 },
    ],
    amount: 295,
    paymentMethod: 'Card',
    status: 'Pending',
  },
  {
    id: 'inv-6',
    invoiceNumber: 'INV-1046',
    patientId: 'pat-7',
    patientName: 'Bilal Tariq',
    date: '2026-09-18',
    dueDate: '2026-09-18',
    items: [
      { description: 'Orthopedic Joint Mobility Evaluation', quantity: 1, rate: 130, amount: 130 },
      { description: 'Digital X-Ray (Right Knee 2 Views)', quantity: 1, rate: 85, amount: 85 },
    ],
    amount: 215,
    paymentMethod: 'Cash',
    status: 'Paid',
  },
];

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    text: 'Patient Ahmed Khan checked in for Cardiology consultation',
    time: '8 minutes ago',
    type: 'patient',
  },
  {
    id: 'act-2',
    text: 'Appointment confirmed with Dr. Sarah Ahmed for 02:00 PM',
    time: '24 minutes ago',
    type: 'appointment',
  },
  {
    id: 'act-3',
    text: 'Invoice #INV-1042 paid ($125.00) via Cash by Sara Malik',
    time: '41 minutes ago',
    type: 'invoice',
  },
  {
    id: 'act-4',
    text: 'Prescription #RX-3 generated for Ayesha Noor by Dr. Ayesha Malik',
    time: '1 hour ago',
    type: 'prescription',
  },
  {
    id: 'act-5',
    text: 'Neurology diagnostic notes updated for patient Usman Ali',
    time: '2 hours ago',
    type: 'patient',
  },
  {
    id: 'act-6',
    text: 'Invoice #INV-1041 settled ($185.00) via Card',
    time: '3 hours ago',
    type: 'invoice',
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Appointment Booked',
    message: 'Sara Malik scheduled a follow-up consultation with Dr. Hamza Khan.',
    time: '12m ago',
    read: false,
    type: 'appointment',
  },
  {
    id: 'notif-2',
    title: 'Payment Received',
    message: 'Invoice #INV-1042 ($125.00) marked as settled via Cash counter.',
    time: '45m ago',
    read: false,
    type: 'payment',
  },
  {
    id: 'notif-3',
    title: 'Digital Prescription Filed',
    message: 'Dr. Sarah Ahmed submitted Rx #RX-1 with 2 active prescriptions.',
    time: '2h ago',
    read: true,
    type: 'prescription',
  },
  {
    id: 'notif-4',
    title: 'Lab Reports Ready',
    message: 'Complete Blood Count (CBC) analysis uploaded for Ahmed Khan.',
    time: '4h ago',
    read: true,
    type: 'system',
  },
];

export const initialSettings: ClinicSettings = {
  clinicName: 'ClinicFlow Medical & Diagnostic Center',
  phone: '+1 (555) 900-3400',
  email: 'operations@clinicflow.demo',
  address: 'Suite 500, Health Plaza Avenue, Metro City, NY 10001',
  website: 'https://clinicflow.demo',
  taxId: 'TX-948201-CL',
  emailNotifications: true,
  appointmentNotifications: true,
  billingNotifications: true,
  language: 'English (US)',
  timezone: 'America/New_York (EST, UTC-5)',
  currency: 'USD ($)',
};

export const monthlyRevenueData = [
  { month: 'Apr', revenue: 18400, patients: 940, appointments: 280 },
  { month: 'May', revenue: 19800, patients: 1020, appointments: 310 },
  { month: 'Jun', revenue: 21500, patients: 1110, appointments: 335 },
  { month: 'Jul', revenue: 22900, patients: 1180, appointments: 350 },
  { month: 'Aug', revenue: 23400, patients: 1225, appointments: 368 },
  { month: 'Sep', revenue: 24680, patients: 1284, appointments: 384 },
];

export const appointmentStatusDistribution = [
  { name: 'Confirmed', value: 58, color: '#2563EB' },
  { name: 'Completed', value: 26, color: '#10B981' },
  { name: 'Pending', value: 12, color: '#F59E0B' },
  { name: 'Cancelled', value: 4, color: '#EF4444' },
];

export const departmentPerformanceData = [
  { name: 'Cardiology', patients: 384, revenue: 8400 },
  { name: 'Gen Medicine', patients: 512, revenue: 6900 },
  { name: 'Dermatology', patients: 246, revenue: 4200 },
  { name: 'Pediatrics', patients: 320, revenue: 3800 },
  { name: 'Orthopedics', patients: 260, revenue: 4100 },
  { name: 'Neurology', patients: 182, revenue: 3100 },
];
