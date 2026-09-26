import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { Invoice } from '../../data/mockData';
import { useClinic } from '../../context/ClinicContext';
import { Printer, HeartPulse } from 'lucide-react';

interface PrintInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

export default function PrintInvoiceModal({ isOpen, onClose, invoice }: PrintInvoiceModalProps) {
  const { settings, patients } = useClinic();

  if (!invoice) return null;

  const patient = patients.find(p => p.id === invoice.patientId || p.name === invoice.patientName);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Clinic Invoice Statement"
      subtitle={`Billing Document #${invoice.invoiceNumber}`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        <div className="printable-content bg-white text-slate-900 p-4 sm:p-8 rounded-xl border border-slate-200 shadow-xs font-sans min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-5 gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-700">
                <HeartPulse className="w-6 h-6 shrink-0" />
                <h1 className="text-xl font-bold tracking-tight">{settings.clinicName}</h1>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">{settings.address}</p>
              <p className="text-xs text-slate-500">
                Tax ID: {settings.taxId} · Phone: {settings.phone}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-widest font-bold text-slate-400">
                Official Invoice
              </span>
              <p className="text-lg font-bold text-slate-900">{invoice.invoiceNumber}</p>
              <div className="mt-1 flex justify-start sm:justify-end">
                <Badge status={invoice.status} />
              </div>
            </div>
          </div>

          {/* Bill To & Invoice Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6 text-xs">
            <div>
              <span className="text-slate-400 uppercase tracking-wider font-semibold block mb-1">
                Billed To
              </span>
              <p className="font-bold text-sm text-slate-900">{invoice.patientName}</p>
              <p className="text-slate-600 mt-0.5">{patient?.address || '742 Evergreen Terrace'}</p>
              <p className="text-slate-600">{patient?.phone || '+1 (555) 102-3948'}</p>
              <p className="text-slate-500">{patient?.email || 'patient@example.com'}</p>
            </div>
            <div className="text-left sm:text-right space-y-1">
              <div>
                <span className="text-slate-400 font-medium">Issue Date: </span>
                <span className="font-semibold text-slate-800">{invoice.date}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Due Date: </span>
                <span className="font-semibold text-slate-800">{invoice.dueDate}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Payment Mode: </span>
                <span className="font-semibold text-slate-800">{invoice.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="mb-6 overflow-x-auto min-w-0">
            <table className="w-full text-left text-xs border-collapse min-w-[440px]">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 font-semibold">Description</th>
                  <th className="py-2.5 font-semibold text-center w-16">Qty</th>
                  <th className="py-2.5 font-semibold text-right w-24">Unit Rate</th>
                  <th className="py-2.5 font-semibold text-right w-24">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 font-medium text-slate-800">{item.description}</td>
                    <td className="py-3 text-center text-slate-600 tabular-nums">{item.quantity}</td>
                    <td className="py-3 text-right text-slate-600 tabular-nums">${item.rate.toFixed(2)}</td>
                    <td className="py-3 text-right font-bold text-slate-900 tabular-nums">
                      ${item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end pt-4 border-t border-slate-200">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold">${invoice.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax / Surcharge (0%)</span>
                <span className="tabular-nums font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Paid</span>
                <span className="text-blue-700 tabular-nums">${invoice.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="mt-8 sm:mt-12 pt-5 border-t border-slate-100 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p>Thank you for choosing {settings.clinicName}. Please retain this receipt for insurance records.</p>
            <p className="font-mono">CLINICFLOW-PAY-AUTH-OK</p>
          </div>
        </div>

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
            Print Invoice
          </button>
        </div>
      </div>
    </Modal>
  );
}
