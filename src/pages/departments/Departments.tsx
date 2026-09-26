import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Building2,
  Users,
  Stethoscope,
  Calendar,
  HeartPulse,
  Sparkles,
  Brain,
  Baby,
  Smile,
  Bone,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Department } from '../../data/mockData';

// Realistic department photos
import deptCardiologyImg from '../../assets/images/department_cardiology_1790450343914.jpg';
import deptRadiologyImg from '../../assets/images/dept_radiology_tech_1790450357024.jpg';
import clinicHeroImg from '../../assets/images/clinic_hero_facility_1790450294911.jpg';

export default function Departments() {
  const { departments, openModal } = useClinic();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cardiology':
        return HeartPulse;
      case 'Dermatology':
        return Sparkles;
      case 'Neurology':
        return Brain;
      case 'Pediatrics':
        return Baby;
      case 'Dental Care':
        return Smile;
      case 'Orthopedics':
        return Bone;
      default:
        return Stethoscope;
    }
  };

  const getDepartmentImage = (name: string) => {
    if (name === 'Cardiology') return deptCardiologyImg;
    if (name === 'Neurology') return deptRadiologyImg;
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Clinical Departments & Facilities
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Overview of specialized hospital wings, patient intake volume, diagnostic suites, and bed capacities.
          </p>
        </div>

        <button
          onClick={() => openModal('addAppointment')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors w-full sm:w-auto shrink-0 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          Schedule Dept Visit
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {departments.map(dept => {
          const Icon = getIcon(dept.name);
          const deptImg = getDepartmentImage(dept.name);

          return (
            <div
              key={dept.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Optional realistic photography banner if available */}
                {deptImg && (
                  <div className="h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                    <img
                      src={deptImg}
                      alt={dept.name}
                      width={600}
                      height={240}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/95 dark:bg-slate-900/95 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 backdrop-blur-xs">
                      {dept.roomCapacity} Clinical Suites
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    {!deptImg && (
                      <span className="text-xs font-mono font-medium text-slate-400">
                        {dept.roomCapacity} Suites
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{dept.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {dept.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Head of Dept:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{dept.headOfDept}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2 text-center text-xs bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Doctors</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{dept.doctorsCount}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Patients</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{dept.patientsCount}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Visits</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400 tabular-nums">{dept.appointmentsCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Operational
                  </span>
                  <button
                    onClick={() => openModal('addAppointment')}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Book In Department →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
