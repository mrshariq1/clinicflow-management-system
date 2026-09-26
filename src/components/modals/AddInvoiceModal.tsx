import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useClinic } from '../../context/ClinicContext';
import { Plus, Trash2 } from 'lucide-react';
import { InvoiceItem } from '../../data/mockData';

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddInvoiceModal({ isOpen, onClose }: AddInvoiceModalProps) {
  const { patients, addInvoice } = useClinic();

  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'Bank Transfer'>('Card');
  const [status, setStatus] = useState<'Paid' | 'Pending'>('Paid');
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: 'Specialist Medical Consultation', quantity: 1, rate: 100, amount: 100 },
  ]);

  const handleAddItem = () => {
    setItems(prev => [
      ...prev,
      { description: 'Clinical Diagnostics / Lab Fee', quantity: 1, rate: 50, amount: 50 },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    setItems(prev => {
      const updated = [...prev];
      const current = { ...updated[index], [field]: value };
      if (field === 'quantity' || field === 'rate') {
        const qty = field === 'quantity' ? Number(value) : current.quantity;
        const rate = field === 'rate' ? Number(value) : current.rate;
        current.amount = qty * rate;
      }
      updated[index] = current;
      return updated;
    });
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patientObj = patients.find(p => p.id === patientId);
    const today = new Date().toISOString().split('T')[0];

    addInvoice({
      patientId,
      patientName: patientObj?.name || 'Walk-in Patient',
      date: today,
      dueDate: today,
      items,
      amount: totalAmount,
      paymentMethod,
      status,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Patient Invoice"
      subtitle="Generate official clinic billing statement"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Settlement Status
            </label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Invoice Items */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Billing Items
            </label>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Service
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700"
              >
                <input
                  type="text"
                  required
                  placeholder="Service description"
                  value={item.description}
                  onChange={e => handleItemChange(idx, 'description', e.target.value)}
                  className="w-full sm:flex-1 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg min-w-0"
                />
                <div className="flex items-center justify-between sm:justify-start gap-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 sm:hidden">Qty:</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
                      className="w-14 sm:w-16 px-2 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-center"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400">$</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="Rate"
                      value={item.rate}
                      onChange={e => handleItemChange(idx, 'rate', e.target.value)}
                      className="w-20 px-2 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-right"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 w-16 text-right tabular-nums">
                    ${item.amount.toFixed(2)}
                  </span>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Total Summary */}
        <div className="flex justify-end p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          <div className="text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Due Amount</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            Generate Invoice
          </button>
        </div>
      </form>
    </Modal>
  );
}
