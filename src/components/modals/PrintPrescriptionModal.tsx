import React from 'react';
import Modal from '../common/Modal';
import { Prescription } from '../../data/mockData';
import { useClinic } from '../../context/ClinicContext';
import { Printer, HeartPulse } from 'lucide-react';

interface PrintPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescription: Prescription | null;
}

export default function PrintPrescriptionModal({
  isOpen,
  onClose,
  prescription,
}: PrintPrescriptionModalProps) {
  const { settings, patients } = useClinic();

  if (!prescription) return null;

  const patient = patients.find(p => p.id === prescription.patientId || p.name === prescription.patientName);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Medical Prescription Viewer"
      subtitle="Authorized clinical document ready for printing or export"
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Prescription Sheet Container */}
        <div className="printable-content bg-white text-slate-900 p-4 sm:p-8 rounded-xl border border-slate-200 shadow-xs font-sans min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-blue-600 pb-5 gap-3">
            <div>
              <div className="flex items-center gap-2 text-blue-700">
                <HeartPulse className="w-6 h-6 shrink-0" />
                <h1 className="text-xl font-bold tracking-tight">{settings.clinicName}</h1>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">{settings.address}</p>
              <p className="text-xs text-slate-500">
                Phone: {settings.phone} · Web: {settings.website}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-widest font-bold text-slate-400">
                Prescription
              </span>
              <p className="text-sm font-bold text-slate-800">#{prescription.id.toUpperCase()}</p>
              <p className="text-xs text-slate-500 mt-0.5">Date: {prescription.date}</p>
            </div>
          </div>

          {/* Clinician and Patient Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-5 p-4 bg-slate-50 rounded-lg text-xs border border-slate-100">
            <div>
              <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Consultant Physician
              </span>
              <p className="font-bold text-sm text-slate-900">{prescription.doctorName}</p>
              <p className="text-slate-600">Department of Specialized Medicine</p>
              <p className="text-slate-500">License: MD-9482-CL</p>
            </div>
            <div>
              <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Patient Information
              </span>
              <p className="font-bold text-sm text-slate-900">{prescription.patientName}</p>
              <p className="text-slate-600">
                Age: {patient?.age || '32'} yrs · Gender: {patient?.gender || 'N/A'} · Blood: {patient?.bloodGroup || 'O+'}
              </p>
              <p className="text-slate-500">Phone: {patient?.phone || 'N/A'}</p>
            </div>
          </div>

          {/* Clinical Diagnosis */}
          <div className="mb-6">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Diagnosis / Clinical Indication:
            </span>
            <p className="text-sm font-semibold text-slate-900 mt-1 bg-blue-50/60 p-2.5 rounded border border-blue-100">
              {prescription.diagnosis}
            </p>
          </div>

          {/* Rx Symbol & Medication Table */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-serif font-black text-blue-700 italic">℞</span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Medications & Administration Schedule
              </span>
            </div>

            <div className="overflow-x-auto min-w-0">
              <table className="w-full text-left text-xs border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-600">
                    <th className="py-2 font-semibold">#</th>
                    <th className="py-2 font-semibold">Medicine & Dosage</th>
                    <th className="py-2 font-semibold">Frequency</th>
                    <th className="py-2 font-semibold">Duration</th>
                    <th className="py-2 font-semibold">Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {prescription.medicines.map((m, idx) => (
                    <tr key={idx} className="py-2">
                      <td className="py-2.5 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-2.5">
                        <span className="font-bold text-slate-900 block">{m.name}</span>
                        <span className="text-slate-500">{m.dosage}</span>
                      </td>
                      <td className="py-2.5 font-medium text-slate-800">{m.frequency}</td>
                      <td className="py-2.5 text-slate-700">{m.duration}</td>
                      <td className="py-2.5 text-slate-600 italic">{m.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Advice & Doctor Signature */}
          {prescription.notes && (
            <div className="mb-8 p-3 bg-slate-50 rounded text-xs text-slate-700 border border-slate-100">
              <span className="font-bold block mb-0.5">Physician Advice & Lifestyle Notes:</span>
              <p>{prescription.notes}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-6 border-t border-slate-200 mt-8">
            <div className="text-[11px] text-slate-400 max-w-xs">
              <p>Valid for 30 days from date of issue. Please present this prescription upon dispensing.</p>
              <p className="mt-1">Generated via ClinicFlow Systems.</p>
            </div>
            <div className="text-left sm:text-center shrink-0">
              <div className="w-40 border-b border-slate-400 mb-1" />
              <p className="text-xs font-bold text-slate-900">{prescription.doctorName}</p>
              <p className="text-[10px] text-slate-500 uppercase">Authorized Clinical Signature</p>
            </div>
          </div>
        </div>

        {/* Action Buttons (Hidden when printed) */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 no-print">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-center cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print Prescription
          </button>
        </div>
      </div>
    </Modal>
  );
}
