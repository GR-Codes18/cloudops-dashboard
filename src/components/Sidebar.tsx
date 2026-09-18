import React from 'react';
import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  Globe,
  ShieldCheck,
  Network,
  Boxes,
  Cloud,
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/planning', label: 'Planificación Cloud', icon: FileText },
  { to: '/costs', label: 'Costos', icon: DollarSign },
  { to: '/infrastructure', label: 'Infraestructura Global', icon: Globe },
  { to: '/security', label: 'Seguridad', icon: ShieldCheck },
  { to: '/network', label: 'Arquitectura de Red', icon: Network },
  { to: '/services', label: 'Servicios AWS', icon: Boxes },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-sidebar text-slate-300 flex flex-col h-screen sticky top-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800 bg-slate-900/50">
        <div className="p-2 bg-primary/10 text-primary rounded-xl">
          <Cloud className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-bold text-white text-base leading-tight">CloudOps</h1>
          <p className="text-xs text-text-secondary">AWS Architecture Suite</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer info / Status pill */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-security animate-pulse" />
          <span className="text-xs text-slate-400 font-medium">Entorno de Simulación</span>
        </div>
      </div>
    </aside>
  );
};