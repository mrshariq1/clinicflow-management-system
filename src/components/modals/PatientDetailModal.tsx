import React, { useState } from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { Patient } from '../../data/mockData';
import { useClinic } from '../../context/ClinicContext';
import { User, Calendar, Pill, Receipt, Phone, Mail, MapPin, HeartPulse, Activity } from 'lucide-react';

interface PatientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export default function PatientDetailModal({ isOpen, onClose, patient }: PatientDetailModalProps) {
  const { appointments, prescriptions, invoices, openModal } = useClinic();
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'prescriptions' | 'billing'>('overview');

  if (!patient) return null;

  const patientAppointments = appointments.filter(a => a.patientId === patient.id || a.patientName === patient.name);
  const patientPrescriptions = prescriptions.filter(p => p.patientId === patient.id || p.patientName === patient.name);
  const patientInvoices = invoices.filter(i => i.patientId === patient.id || i.patientName === patient.name);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${patient.name} — Patient Record`}
      subtitle={`ID: ${patient.id} · Registered since 2026`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Patient Summary Header Card */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{patient.name}</h4>
                <Badge status={patient.status} />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>{patient.gender}</span>
                <span>·</span>
                <span>{patient.age} years old</span>
                <span>·</span>
                <span>DOB: {patient.dob}</span>
                <span>·</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">Blood: {patient.bloodGroup}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                openModal('addAppointment', { defaultPatientId: patient.id, defaultPatientName: patient.name });
              }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              + Book Visit
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto min-w-0 max-w-full">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'overview'
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'appointments'
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Appointments ({patientAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'prescriptions'
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            Prescriptions ({patientPrescriptions.length})
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'billing'
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            Invoices ({patientInvoices.length})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-3">
              <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Contact & Residential
              </h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{patient.address}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Emergency: </span>
                  {patient.emergencyContact || 'None listed'}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-3">
              <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Clinical Details
              </h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Assigned Physician:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{patient.assignedDoctor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Last Clinical Visit:</span>
                  <span className="text-slate-800 dark:text-slate-200">{patient.lastVisit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Blood Group:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">{patient.bloodGroup}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Medical Notes:</span>
                  <p className="text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 italic">
                    "{patient.medicalNotes}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-2">
            {patientAppointments.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No scheduled visits for this patient.</p>
            ) : (
              patientAppointments.map(apt => (
                <div
                  key={apt.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white">{apt.doctorName}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-600 dark:text-slate-400">{apt.type}</span>
                    </div>
                    <p className="text-slate-500">{apt.date} at {apt.time} ({apt.room})</p>
                  </div>
                  <Badge status={apt.status} />
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Prescriptions */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-3">
            {patientPrescriptions.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No active prescriptions recorded.</p>
            ) : (
              patientPrescriptions.map(rx => (
                <div
                  key={rx.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{rx.diagnosis}</span>
                      <p className="text-slate-500 mt-0.5">Prescribed by {rx.doctorName} on {rx.date}</p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        openModal('printPrescription', rx);
                      }}
                      className="px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-md transition-colors"
                    >
                      Print Rx
                    </button>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                    {rx.medicines.map((m, idx) => (
                      <div key={idx} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                        <span className="font-medium">{m.name} ({m.dosage})</span>
                        <span className="text-slate-500">{m.frequency} · {m.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: Billing */}
        {activeTab === 'billing' && (
          <div className="space-y-2">
            {patientInvoices.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No invoice history found.</p>
            ) : (
              patientInvoices.map(inv => (
                <div
                  key={inv.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white">{inv.invoiceNumber}</span>
                      <span className="text-slate-400">·</span>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">${inv.amount.toFixed(2)}</span>
                    </div>
                    <p className="text-slate-500">{inv.date} · via {inv.paymentMethod}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge status={inv.status} />
                    <button
                      onClick={() => {
                        onClose();
                        openModal('printInvoice', inv);
                      }}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close Record
          </button>
        </div>
      </div>
    </Modal>
  );
}
