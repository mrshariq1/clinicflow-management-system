import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useClinic } from '../../context/ClinicContext';
import { Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { showToast } = useClinic();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clinicName: '',
    systemType: 'Private Practice / Medical Clinic',
    requirements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('✓ Demo consultation request received! We will be in touch.', 'success');
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request a Custom Management System"
      subtitle="Tailored to your specific clinical workflow, team hierarchy, and patient experience"
      maxWidth="lg"
    >
      {submitted ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Inquiry Received</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Thank you for exploring ClinicFlow! Our systems architecture team will reach out with a tailored demo preview for your clinic.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Dr. Jordan Hayes"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Work Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="jordan@apexclinic.com"
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Clinic / Center Name
              </label>
              <input
                type="text"
                value={formData.clinicName}
                onChange={e => setFormData({ ...formData, clinicName: e.target.value })}
                placeholder="Apex Medical Group"
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Clinic Type & Workflow Scope
            </label>
            <select
              value={formData.systemType}
              onChange={e => setFormData({ ...formData, systemType: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Private Practice / Medical Clinic">Private Practice / Medical Clinic</option>
              <option value="Multi-Specialty Medical Center">Multi-Specialty Medical Center</option>
              <option value="Dental Practice & Orthodontics">Dental Practice & Orthodontics</option>
              <option value="Diagnostic & Pathology Laboratory">Diagnostic & Pathology Laboratory</option>
              <option value="Dermatology & Aesthetic Center">Dermatology & Aesthetic Center</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Custom Requirements or Current Bottlenecks
            </label>
            <textarea
              rows={3}
              value={formData.requirements}
              onChange={e => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Tell us about your team size, patient intake volume, or features you need built..."
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
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Request
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
