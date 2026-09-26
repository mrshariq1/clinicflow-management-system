import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Patient,
  Doctor,
  Appointment,
  Department,
  Prescription,
  Invoice,
  ActivityItem,
  NotificationItem,
  ClinicSettings,
  initialPatients,
  initialDoctors,
  initialAppointments,
  initialDepartments,
  initialPrescriptions,
  initialInvoices,
  initialActivities,
  initialNotifications,
  initialSettings,
} from '../data/mockData';
import { getStorage, setStorage } from '../services/storage';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ClinicContextType {
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
  departments: Department[];
  prescriptions: Prescription[];
  invoices: Invoice[];
  activities: ActivityItem[];
  notifications: NotificationItem[];
  settings: ClinicSettings;
  theme: 'light' | 'dark';
  onboardingDismissed: boolean;
  toasts: Toast[];
  toggleTheme: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  dismissOnboarding: () => void;
  
  // Patient CRUD
  addPatient: (data: Omit<Patient, 'id' | 'lastVisit' | 'status'> & { status?: Patient['status'] }) => Patient;
  updatePatient: (id: string, data: Partial<Patient>) => void;
  deletePatient: (id: string) => void;

  // Appointment CRUD
  addAppointment: (data: Omit<Appointment, 'id'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  cancelAppointment: (id: string) => void;

  // Doctor CRUD
  addDoctor: (data: Omit<Doctor, 'id' | 'patientsCount' | 'rating'>) => Doctor;

  // Prescription CRUD
  addPrescription: (data: Omit<Prescription, 'id'>) => Prescription;

  // Invoice CRUD
  addInvoice: (data: Omit<Invoice, 'id' | 'invoiceNumber'>) => Invoice;
  updateInvoiceStatus: (id: string, status: Invoice['status']) => void;

  // Notification actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Settings
  updateSettings: (newSettings: Partial<ClinicSettings>) => void;

  // Global Quick Action Modal control
  activeModal: string | null;
  openModal: (modalName: string, modalProps?: any) => void;
  closeModal: () => void;
  modalProps: any;
}

const ClinicContext = createContext<ClinicContextType | null>(null);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = getStorage('clinic_theme', 'light');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  useEffect(() => {
    setStorage('clinic_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Onboarding banner state
  const [onboardingDismissed, setOnboardingDismissed] = useState<boolean>(() => {
    return getStorage('clinic_onboarding_dismissed', false);
  });

  const dismissOnboarding = () => {
    setOnboardingDismissed(true);
    setStorage('clinic_onboarding_dismissed', true);
  };

  // Main entity states with LocalStorage persistence
  const [patients, setPatients] = useState<Patient[]>(() => {
    return getStorage('clinic_patients', initialPatients);
  });
  useEffect(() => setStorage('clinic_patients', patients), [patients]);

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    return getStorage('clinic_doctors', initialDoctors);
  });
  useEffect(() => setStorage('clinic_doctors', doctors), [doctors]);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    return getStorage('clinic_appointments', initialAppointments);
  });
  useEffect(() => setStorage('clinic_appointments', appointments), [appointments]);

  const [departments] = useState<Department[]>(initialDepartments);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    return getStorage('clinic_prescriptions', initialPrescriptions);
  });
  useEffect(() => setStorage('clinic_prescriptions', prescriptions), [prescriptions]);

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    return getStorage('clinic_invoices', initialInvoices);
  });
  useEffect(() => setStorage('clinic_invoices', invoices), [invoices]);

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    return getStorage('clinic_activities', initialActivities);
  });
  useEffect(() => setStorage('clinic_activities', activities), [activities]);

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    return getStorage('clinic_notifications', initialNotifications);
  });
  useEffect(() => setStorage('clinic_notifications', notifications), [notifications]);

  const [settings, setSettings] = useState<ClinicSettings>(() => {
    return getStorage('clinic_settings', initialSettings);
  });
  useEffect(() => setStorage('clinic_settings', settings), [settings]);

  // Modal control
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState<any>(null);

  const openModal = (name: string, props: any = null) => {
    setActiveModal(name);
    setModalProps(props);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalProps(null);
  };

  // Activity logger helper
  const logActivity = (text: string, type: ActivityItem['type']) => {
    const newAct: ActivityItem = {
      id: 'act-' + Date.now(),
      text,
      time: 'Just now',
      type,
    };
    setActivities(prev => [newAct, ...prev.slice(0, 15)]);
  };

  // Patient Actions
  const addPatient = (data: Omit<Patient, 'id' | 'lastVisit' | 'status'> & { status?: Patient['status'] }) => {
    const newPat: Patient = {
      ...data,
      id: 'pat-' + (patients.length + 1) + '-' + Date.now().toString().slice(-4),
      lastVisit: new Date().toISOString().split('T')[0],
      status: data.status || 'Active',
    };
    setPatients(prev => [newPat, ...prev]);
    logActivity(`Patient ${newPat.name} added to database`, 'patient');
    showToast(`✓ Patient ${newPat.name} successfully registered`, 'success');
    return newPat;
  };

  const updatePatient = (id: string, data: Partial<Patient>) => {
    setPatients(prev => prev.map(p => (p.id === id ? { ...p, ...data } : p)));
    showToast(`Patient records updated successfully`, 'success');
  };

  const deletePatient = (id: string) => {
    const pat = patients.find(p => p.id === id);
    setPatients(prev => prev.filter(p => p.id !== id));
    logActivity(`Patient ${pat?.name || id} removed`, 'patient');
    showToast(`Patient record deleted`, 'info');
  };

  // Appointment Actions
  const addAppointment = (data: Omit<Appointment, 'id'>) => {
    const newApt: Appointment = {
      ...data,
      id: 'apt-' + (appointments.length + 1) + '-' + Date.now().toString().slice(-4),
    };
    setAppointments(prev => [newApt, ...prev]);
    logActivity(`Appointment booked for ${newApt.patientName} with ${newApt.doctorName}`, 'appointment');
    showToast(`✓ Appointment confirmed for ${newApt.patientName}`, 'success');
    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => (a.id === id ? { ...a, status } : a)));
    showToast(`Appointment status updated to ${status}`, 'success');
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => (a.id === id ? { ...a, status: 'Cancelled' } : a)));
    showToast(`Appointment cancelled`, 'info');
  };

  // Doctor Actions
  const addDoctor = (data: Omit<Doctor, 'id' | 'patientsCount' | 'rating'>) => {
    const newDoc: Doctor = {
      ...data,
      id: 'doc-' + (doctors.length + 1),
      patientsCount: 0,
      rating: 5.0,
    };
    setDoctors(prev => [...prev, newDoc]);
    showToast(`✓ ${newDoc.name} registered to medical staff`, 'success');
    return newDoc;
  };

  // Prescription Actions
  const addPrescription = (data: Omit<Prescription, 'id'>) => {
    const newRx: Prescription = {
      ...data,
      id: 'rx-' + (prescriptions.length + 1) + '-' + Date.now().toString().slice(-3),
    };
    setPrescriptions(prev => [newRx, ...prev]);
    logActivity(`Digital Rx #${newRx.id.toUpperCase()} generated for ${newRx.patientName}`, 'prescription');
    showToast(`✓ Prescription created for ${newRx.patientName}`, 'success');
    return newRx;
  };

  // Invoice Actions
  const addInvoice = (data: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    const newNum = 'INV-' + (1040 + invoices.length + 1);
    const newInv: Invoice = {
      ...data,
      id: 'inv-' + Date.now().toString().slice(-4),
      invoiceNumber: newNum,
    };
    setInvoices(prev => [newInv, ...prev]);
    logActivity(`Invoice #${newNum} ($${newInv.amount}) generated for ${newInv.patientName}`, 'invoice');
    showToast(`✓ Invoice #${newNum} created successfully`, 'success');
    return newInv;
  };

  const updateInvoiceStatus = (id: string, status: Invoice['status']) => {
    setInvoices(prev => prev.map(inv => (inv.id === id ? { ...inv, status } : inv)));
    showToast(`Invoice status updated to ${status}`, 'success');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Settings
  const updateSettings = (newSettings: Partial<ClinicSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('✓ Clinic settings saved successfully', 'success');
  };

  return (
    <ClinicContext.Provider
      value={{
        patients,
        doctors,
        appointments,
        departments,
        prescriptions,
        invoices,
        activities,
        notifications,
        settings,
        theme,
        onboardingDismissed,
        toasts,
        toggleTheme,
        showToast,
        removeToast,
        dismissOnboarding,
        addPatient,
        updatePatient,
        deletePatient,
        addAppointment,
        updateAppointmentStatus,
        cancelAppointment,
        addDoctor,
        addPrescription,
        addInvoice,
        updateInvoiceStatus,
        markNotificationRead,
        markAllNotificationsRead,
        updateSettings,
        activeModal,
        openModal,
        closeModal,
        modalProps,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
