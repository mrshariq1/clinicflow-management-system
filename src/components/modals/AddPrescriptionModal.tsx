import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useClinic } from '../../context/ClinicContext';
import { Plus, Trash2 } from 'lucide-react';
import { PrescriptionMedicine } from '../../data/mockData';

interface AddPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPrescriptionModal({ isOpen, onClose }: AddPrescriptionModalProps) {
  const { patients, doctors, addPrescription } = useClinic();

  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || '');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('Drink plenty of fluids and maintain scheduled follow-up.');
  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>([
    {
      id: 'm-1',
      name: 'Amoxicillin Trihydrate',
      dosage: '500mg',
      frequency: 'Three times daily',
      duration: '7 Days',
      instructions: 'Take after meals. Complete the entire antimicrobial course.',
    },
  ]);

  const handleAddMedicine = () => {
    setMedicines(prev => [
      ...prev,
      {
        id: 'm-' + Date.now(),
        name: '',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '14 Days',
        instructions: 'Take with warm water.',
      },
    ]);
  };

  const handleRemoveMedicine = (id: string) => {
    if (medicines.length <= 1) return;
    setMedicines(prev => prev.filter(m => m.id !== id));
  };

  const [error, setError] = useState('');

  const handleUpdateMedicine = (id: string, field: keyof PrescriptionMedicine, value: string) => {
    setMedicines(prev => prev.map(m => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patientObj = patients.find(p => p.id === patientId);
    const doctorObj = doctors.find(d => d.id === doctorId);

    if (!diagnosis.trim()) {
      setError('Please enter a clinical diagnosis.');
      return;
    }
    setError('');

    addPrescription({
      patientId,
      patientName: patientObj?.name || 'Walk-in Patient',
      doctorId,
      doctorName: doctorObj?.name || 'Dr. Sarah Ahmed',
      date: new Date().toISOString().split('T')[0],
      diagnosis,
      medicines,
      notes,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Digital Prescription"
      subtitle="Issue an authorized clinical prescription with dynamic pharmaceutical items"
      maxWidth="3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Patient
            </label>
            <select
              value={patientId}
              onChange={e => setPatientId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} (Age: {p.age}, Blood: {p.bloodGroup})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Prescribing Physician
            </label>
            <select
              value={doctorId}
              onChange={e => setDoctorId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {doctors.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.specialization})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Clinical Diagnosis *
          </label>
          <input
            type="text"
            required
            value={diagnosis}
            onChange={e => setDiagnosis(e.target.value)}
            placeholder="e.g. Acute Pharyngitis & Upper Respiratory Infection"
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dynamic Medicines List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Prescribed Medicines ({medicines.length})
            </label>
            <button
              type="button"
              onClick={handleAddMedicine}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Medication
            </button>
          </div>

          <div className="space-y-3">
            {medicines.map((m, index) => (
              <div
                key={m.id}
                className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Medicine #{index + 1}
                  </span>
                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(m.id)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                      aria-label="Remove medicine"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      required
                      placeholder="Medication name (e.g. Paracetamol)"
                      value={m.name}
                      onChange={e => handleUpdateMedicine(m.id, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Dosage (500mg)"
                      value={m.dosage}
                      onChange={e => handleUpdateMedicine(m.id, 'dosage', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Duration (7 Days)"
                      value={m.duration}
                      onChange={e => handleUpdateMedicine(m.id, 'duration', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Frequency (e.g. Twice Daily after meals)"
                    value={m.frequency}
                    onChange={e => handleUpdateMedicine(m.id, 'frequency', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Specific instructions (e.g. Take with plenty of water)"
                    value={m.instructions}
                    onChange={e => handleUpdateMedicine(m.id, 'instructions', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            General Lifestyle / Dietary Advice
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-center cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors text-center cursor-pointer"
          >
            Issue Prescription
          </button>
        </div>
      </form>
    </Modal>
  );
}
