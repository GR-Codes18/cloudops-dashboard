import React from 'react';
import { useLocation } from 'react-router';
import { Bell, Search, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const routeTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'Dashboard General',
    subtitle: 'Resumen ejecutivo y métricas globales de la solución Cloud',
  },
  '/planning': {
    title: 'Planificación Cloud',
    subtitle: 'Gestión y registro de propuestas de arquitectura AWS',
  },
  '/costs': {
    title: 'Costos y Economía Cloud',
    subtitle: 'Calculadora y distribución estimada de inversión mensual y anual',
  },
  '/infrastructure': {
    title: 'Infraestructura Global',
    subtitle: 'Ubicación y estado de regiones y servicios desplegados',
  },
  '/security': {
    title: 'Seguridad e IAM',
    subtitle: 'Modelo de responsabilidad compartida y cumplimiento',
  },
  '/network': {
    title: 'Arquitectura de Red',
    subtitle: 'Visualización de topología VPC y enrutamiento de tráfico',
  },
  '/services': {
    title: 'Catálogo de Servicios AWS',
    subtitle: 'Listado y función principal de servicios utilizados',
  },
};

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const location = useLocation();
  const currentRoute = routeTitles[location.pathname] || {
    title: 'CloudOps Dashboard',
    subtitle: 'Sistema de planificación de soluciones Cloud',
  };

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between sticky top-0 z-10 select-none">
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:bg-slate-100 transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h2 className="text-lg font-bold text-text-primary leading-tight">
            {currentRoute.title}
          </h2>
          <p className="text-xs text-text-secondary hidden sm:block">
            {currentRoute.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Barra de Búsqueda Simulada */}
        <div className="relative hidden lg:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Buscar servicios, regiones..."
            className="w-full pl-9 pr-4 py-1.5 bg-background border border-border rounded-lg text-xs text-text-primary focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Indicador de Notificaciones */}
        <button className="relative p-2 rounded-lg text-text-secondary hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-alert" />
        </button>

        {/* Perfil de Usuario Cloud */}
        <div className="flex items-center gap-3 pl-2 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
            AWS
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-text-primary leading-tight">
              Cloud Architect
            </p>
            <p className="text-[10px] text-text-secondary">Enterprise Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};