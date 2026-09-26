import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import Badge from '../../components/common/Badge';
import {
  Stethoscope,
  Star,
  Users,
  Clock,
  Phone,
  Mail,
  CalendarPlus,
  Search,
  Award,
  Building2,
} from 'lucide-react';
import { Doctor } from '../../data/mockData';

// Lead doctor portrait
import doctorPortraitImg from '../../assets/images/doctor_portrait_lead_1790450323837.jpg';

export default function Doctors() {
  const { doctors, openModal } = useClinic();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const departmentsList = ['All', ...Array.from(new Set(doctors.map(d => d.department)))];

  const filteredDoctors = doctors.filter(d => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || d.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Medical Staff & Specialists
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse our licensed physicians, clinical schedules, on-duty consulting rooms, and patient consultation capacities.
          </p>
        </div>

        <button
          onClick={() => openModal('addAppointment')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors w-full sm:w-auto shrink-0 cursor-pointer"
        >
          <CalendarPlus className="w-4 h-4" />
          Schedule Consultation
        </button>
      </div>

      {/* Search and Department Filter Chips */}
      <div className="p-3.5 sm:p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search doctors by name or specialty..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto min-w-0 max-w-full">
          {departmentsList.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedDept === dept
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => {
          const isLead = doctor.id === 'doc-1';

          return (
            <div
              key={doctor.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Doctor Avatar & Status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {isLead ? (
                      <div className="relative w-13 h-13 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-xs shrink-0 bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        <span className="select-none">AW</span>
                        <img
                          src={doctorPortraitImg}
                          alt={doctor.name}
                          width={52}
                          height={52}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={e => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-13 h-13 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center justify-center border border-blue-500/20 shrink-0">
                        {doctor.name.split(' ').slice(1).map(n => n[0]).join('') || 'DR'}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">{doctor.name}</h3>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{doctor.specialization}</p>
                      <p className="text-[11px] text-slate-400">{doctor.department}</p>
                    </div>
                  </div>
                  <Badge status={doctor.status} />
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-2 my-4 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Exp.</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{doctor.experience}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Patients</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{doctor.patientsCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Rating</span>
                    <span className="font-bold text-amber-500 flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-500" />
                      {doctor.rating}
                    </span>
                  </div>
                </div>

                {/* Schedule and Contact */}
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span className="text-[11px]">{doctor.availability}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-[11px] truncate">{doctor.education}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-[11px]">{doctor.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Accepting appointments</span>
                <button
                  onClick={() => openModal('addAppointment')}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Book Visit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
