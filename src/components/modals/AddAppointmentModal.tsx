import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useClinic } from '../../context/ClinicContext';

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPatientId?: string;
  defaultPatientName?: string;
}

export default function AddAppointmentModal({
  isOpen,
  onClose,
  defaultPatientId,
  defaultPatientName,
}: AddAppointmentModalProps) {
  const { patients, doctors, addAppointment } = useClinic();

  const [selectedPatientId, setSelectedPatientId] = useState(defaultPatientId || (patients[0]?.id ?? ''));
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id ?? '');
  const [date, setDate] = useState('2026-09-27');
  const [time, setTime] = useState('09:30 AM');
  const [type, setType] = useState<'Consultation' | 'Follow-up' | 'Emergency' | 'Routine Checkup'>('Consultation');
  const [room, setRoom] = useState('Room 204 (Cardiology Wing)');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patientObj = patients.find(p => p.id === selectedPatientId);
    const doctorObj = doctors.find(d => d.id === selectedDoctorId);

    const patName = defaultPatientName || patientObj?.name || 'Walk-in Patient';
    const docName = doctorObj?.name || 'Dr. Sarah Ahmed';

    addAppointment({
      patientId: selectedPatientId,
      patientName: patName,
      doctorId: selectedDoctorId,
      doctorName: docName,
      date,
      time,
      type,
      status: 'Confirmed',
      room: room || 'Consultation Suite 1',
      notes: notes || 'Routine patient clinical appointment.',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book New Appointment"
      subtitle="Schedule a consultation with an on-duty clinician"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Patient
          </label>
          <select
            value={selectedPatientId}
            onChange={e => setSelectedPatientId(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} (Phone: {p.phone})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Doctor & Department
          </label>
          <select
            value={selectedDoctorId}
            onChange={e => setSelectedDoctorId(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {doctors.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.specialization} ({d.department})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Time Slot
            </label>
            <select
              value={time}
              onChange={e => setTime(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="08:30 AM">08:30 AM</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="09:30 AM">09:30 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="10:30 AM">10:30 AM</option>
              <option value="11:15 AM">11:15 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="01:30 PM">01:30 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:15 PM">04:15 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Appointment Type
            </label>
            <select
              value={type}
              onChange={e => setType(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency</option>
              <option value="Routine Checkup">Routine Checkup</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Examination Room
            </label>
            <input
              type="text"
              value={room}
              onChange={e => setRoom(e.target.value)}
              placeholder="e.g. Room 204"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Clinical Symptoms or Instructions
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Brief reason for appointment, symptoms, or requested diagnostic tests..."
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
            Confirm Appointment
          </button>
        </div>
      </form>
    </Modal>
  );
}
