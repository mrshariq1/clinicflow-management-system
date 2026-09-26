import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Toast from '../common/Toast';
import { useClinic } from '../../context/ClinicContext';
import { Plus, UserPlus, CalendarPlus, Receipt, Pill, X } from 'lucide-react';

// Modals
import AddPatientModal from '../modals/AddPatientModal';
import PatientDetailModal from '../modals/PatientDetailModal';
import AddAppointmentModal from '../modals/AddAppointmentModal';
import AddPrescriptionModal from '../modals/AddPrescriptionModal';
import PrintPrescriptionModal from '../modals/PrintPrescriptionModal';
import AddInvoiceModal from '../modals/AddInvoiceModal';
import PrintInvoiceModal from '../modals/PrintInvoiceModal';
import ContactModal from '../modals/ContactModal';

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  const { activeModal, closeModal, modalProps, openModal } = useClinic();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Mobile Drawer Backdrop and Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-64 h-full shadow-2xl">
            <Sidebar onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Navbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8">
          <div className="max-w-7xl 2xl:max-w-(--breakpoint-2xl) mx-auto space-y-4 sm:space-y-6 min-w-0 w-full">
            <Outlet />
          </div>

          {/* Portfolio Demo Disclaimer Footer */}
          <footer className="mt-8 sm:mt-12 pt-4 sm:pt-6 pb-6 text-center border-t border-slate-200/60 dark:border-slate-800/80 text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 px-2">
            <p>
              ClinicFlow is a portfolio demonstration using fictional demo data and is not intended for real medical record management.
            </p>
          </footer>
        </main>
      </div>

      {/* Global Quick Action Floating Control */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        {isFabOpen && (
          <div className="absolute bottom-14 right-0 mb-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden p-1.5 space-y-1 text-xs">
            <button
              onClick={() => {
                setIsFabOpen(false);
                openModal('addPatient');
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5 text-blue-500" />
              Add Patient
            </button>
            <button
              onClick={() => {
                setIsFabOpen(false);
                openModal('addAppointment');
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-emerald-500" />
              New Appointment
            </button>
            <button
              onClick={() => {
                setIsFabOpen(false);
                openModal('addPrescription');
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Pill className="w-3.5 h-3.5 text-indigo-500" />
              Write Prescription
            </button>
            <button
              onClick={() => {
                setIsFabOpen(false);
                openModal('addInvoice');
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Receipt className="w-3.5 h-3.5 text-amber-500" />
              Create Invoice
            </button>
          </div>
        )}

        <button
          onClick={() => setIsFabOpen(prev => !prev)}
          className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all ${
            isFabOpen
              ? 'bg-slate-800 text-white rotate-45'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
          }`}
          aria-label="Quick Actions Menu"
        >
          <Plus className="w-6 h-6 transition-transform" />
        </button>
      </div>

      {/* Global Toast Notifications */}
      <Toast />

      {/* Modals Provider Controller */}
      <AddPatientModal
        isOpen={activeModal === 'addPatient'}
        onClose={closeModal}
      />
      <PatientDetailModal
        isOpen={activeModal === 'patientDetail'}
        onClose={closeModal}
        patient={modalProps}
      />
      <AddAppointmentModal
        isOpen={activeModal === 'addAppointment'}
        onClose={closeModal}
        defaultPatientId={modalProps?.defaultPatientId}
        defaultPatientName={modalProps?.defaultPatientName}
      />
      <AddPrescriptionModal
        isOpen={activeModal === 'addPrescription'}
        onClose={closeModal}
      />
      <PrintPrescriptionModal
        isOpen={activeModal === 'printPrescription'}
        onClose={closeModal}
        prescription={modalProps}
      />
      <AddInvoiceModal
        isOpen={activeModal === 'addInvoice'}
        onClose={closeModal}
      />
      <PrintInvoiceModal
        isOpen={activeModal === 'printInvoice'}
        onClose={closeModal}
        invoice={modalProps}
      />
      <ContactModal
        isOpen={activeModal === 'contact'}
        onClose={closeModal}
      />
    </div>
  );
}
