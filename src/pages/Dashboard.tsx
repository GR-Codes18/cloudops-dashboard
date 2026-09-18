import React from 'react';
import { useCloudContext } from '../context/CloudContext';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { awsServices } from '../data/awsServices';
import {
  DollarSign,
  Server,
  Globe,
  ShieldCheck,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { state } = useCloudContext();

  // --- Cálculos Dinámicos de Negocio ---
  const activeProposal = state.proposals[0];

  const totalMonthlyCost = state.costEstimates.reduce(
    (acc, curr) => acc + curr.monthlyCost,
    0
  );
  const totalAnnualCost = totalMonthlyCost * 12;

  const selectedServicesCount = activeProposal
    ? activeProposal.selectedServices.length
    : state.costEstimates.length;

  const currentRegion = activeProposal ? activeProposal.region : 'us-east-1';

  // Datos adaptados para el gráfico de Recharts
  const chartData = state.costEstimates.map((item) => {
    const service = awsServices.find((s) => s.id === item.serviceId);
    return {
      name: service ? service.name.split(' ')[1] || service.name : item.serviceId.toUpperCase(),
      cost: item.monthlyCost,
    };
  });

  const BAR_COLORS = ['#2563EB', '#F59E0B', '#16A34A', '#0EA5E9', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* 1. Fila de Tarjetas de Indicadores (StatCards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Costo Mensual Estimado"
          value={`$${totalMonthlyCost.toFixed(2)}`}
          icon={DollarSign}
          accentColor="cost"
          subtitle="Basado en recursos activos"
        />
        <StatCard
          title="Costo Anual Proyectado"
          value={`$${totalAnnualCost.toFixed(2)}`}
          icon={Activity}
          accentColor="primary"
          subtitle="12 meses de operación"
        />
        <StatCard
          title="Servicios Seleccionados"
          value={selectedServicesCount}
          icon={Server}
          accentColor="security"
          subtitle="Componentes en arquitectura"
        />
        <StatCard
          title="Región Principal"
          value={currentRegion}
          icon={Globe}
          accentColor="primary"
          subtitle="Infraestructura Global"
        />
      </div>

      {/* 2. Sección Central: Gráfico de Costos + Resumen de Arquitectura */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Distribución de Costos (2 Columnas) */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-text-primary text-base">
                Distribución de Costos por Servicio
              </h3>
              <p className="text-xs text-text-secondary">
                Estimación mensual en USD ($) por componente Cloud
              </p>
            </div>
            <span className="px-2.5 py-1 bg-amber-500/10 text-cost text-xs font-semibold rounded-lg">
              Mensual
            </span>
          </div>

          <div className="h-64 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                  <Tooltip
                    formatter={(value) => [`$${Number(value ?? 0).toFixed(2)}`, 'Costo Mensual']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      borderColor: '#E2E8F0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="cost" radius={[6, 6, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-text-secondary">
                No hay ítems de costo registrados aún.
              </div>
            )}
          </div>
        </div>

        {/* Resumen de Propuesta / Estado de Arquitectura (1 Columna) */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-text-primary text-base flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                Solución Activa
              </h3>
              <StatusBadge status="Operativo" size="sm" />
            </div>

            {activeProposal ? (
              <div className="space-y-3 mt-4">
                <div>
                  <p className="text-xs text-text-secondary uppercase font-semibold">Proyecto</p>
                  <p className="text-sm font-bold text-text-primary">{activeProposal.solutionName}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase font-semibold">Tipo de App</p>
                  <p className="text-xs font-medium text-text-primary">{activeProposal.appType}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase font-semibold">Disponibilidad</p>
                  <StatusBadge status={activeProposal.availabilityLevel} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase font-semibold">Usuarios Estimados</p>
                  <p className="text-xs font-medium text-text-primary">
                    {activeProposal.estimatedUsers.toLocaleString()} usuarios activos
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-text-secondary mt-4">
                No se ha registrado ninguna propuesta de solución aún. Ve al módulo de Planificación.
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 text-[11px] text-text-secondary flex justify-between">
            <span>Objetivo AWS</span>
            <span className="text-primary font-semibold">Disponibilidad 99.9%</span>
          </div>
        </div>
      </div>

      {/* 3. Resumen del Estado de Seguridad */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 text-security rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-base leading-tight">
                Estado General de Seguridad y Cumplimiento
              </h3>
              <p className="text-xs text-text-secondary">
                Monitoreo del modelo de responsabilidad compartida AWS
              </p>
            </div>
          </div>
          <StatusBadge status="correcto" size="md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-security flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-text-primary">IAM y Accesos</p>
              <p className="text-[11px] text-text-secondary">MFA obligatorio activado</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-security flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-text-primary">Cifrado de Datos</p>
              <p className="text-[11px] text-text-secondary">AWS KMS activo en S3 y RDS</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-cost flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-text-primary">Red y Seguridad</p>
              <p className="text-[11px] text-text-secondary">1 regla Security Group en revisión</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};