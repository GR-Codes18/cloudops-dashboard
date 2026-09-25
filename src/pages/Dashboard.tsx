import React from 'react';
import { useCloudContext } from '../context/CloudContext';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { awsServices } from '../data/awsServices';
import { securityChecks } from '../data/securityChecks';
import { calculateSecurityMetrics } from '../utils/securityMetrics';
import {
  DollarSign,
  Server,
  Globe,
  ShieldCheck,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  ArrowDown,
  Lock,
  Cpu,
  Database,
  Network as NetworkIcon,
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

// Nodos del flujo general del sistema Cloud (Módulos integrados)
const systemFlowNodes = [
  {
    id: 'ingress',
    title: 'Entrada & CDN',
    subtitle: 'Tráfico & DNS',
    icon: Globe,
    items: ['Route 53', 'CloudFront'],
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 'security',
    title: 'Seguridad & IAM',
    subtitle: 'Protección',
    icon: Lock,
    items: ['IAM Roles', 'AWS KMS'],
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
  },
  {
    id: 'compute',
    title: 'Cómputo (VPC)',
    subtitle: 'Backend App',
    icon: Cpu,
    items: ['EC2 Subred Priv.', 'Auto Scaling'],
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-500/10',
  },
  {
    id: 'data',
    title: 'Persistencia',
    subtitle: 'Datos & Storage',
    icon: Database,
    items: ['RDS Multi-AZ', 'S3 Bucket'],
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
  },
];

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
    : 0;

  const currentRegion = activeProposal ? activeProposal.region : 'us-east-1';

  // --- Métricas de Seguridad Calculadas ---
  const securityMetrics = calculateSecurityMetrics(securityChecks);

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
          subtitle="De la propuesta activa"
        />
        <StatCard
          title="Región Principal"
          value={currentRegion}
          icon={Globe}
          accentColor="primary"
          subtitle="Infraestructura Global"
        />
      </div>

      {/* 2. Fila Central: Gráfico de Costos + Resumen de Arquitectura */}
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

        {/* Resumen de Propuesta / Solución Activa (1 Columna) */}
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

      {/* 3. Fila Inferior: Diagrama del Sistema Cloud (2 cols) + Seguridad Compacta (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Diagrama de Flujo General del Sistema Cloud (2 Columnas) */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  <NetworkIcon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-text-primary text-base">
                  Flujo de Arquitectura del Sistema
                </h3>
              </div>
              <span className="text-[11px] font-medium text-text-secondary bg-slate-100 px-2.5 py-1 rounded-lg">
                Visión End-to-End
              </span>
            </div>
            <p className="text-xs text-text-secondary mb-5">
              Integración entre las capas de entrada, seguridad, cómputo y persistencia de datos
            </p>

            {/* Diagrama de pasos horizontales/verticales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
              {systemFlowNodes.map((node, index) => {
                const Icon = node.icon;
                const isLast = index === systemFlowNodes.length - 1;

                return (
                  <React.Fragment key={node.id}>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex flex-col items-center text-center gap-2 relative">
                      <div className={`p-2.5 rounded-xl ${node.bgColor} ${node.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-text-primary text-xs">{node.title}</p>
                        <p className="text-[10px] text-text-secondary">{node.subtitle}</p>
                      </div>

                      <div className="w-full pt-2 border-t border-slate-200/60 flex flex-col gap-0.5">
                        {node.items.map((item) => (
                          <span
                            key={item}
                            className="text-[10px] font-medium text-slate-600 bg-white border border-slate-100 rounded px-1.5 py-0.5"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {!isLast && (
                      <div className="flex justify-center text-slate-400 py-1 md:py-0">
                        <ArrowRight className="w-4 h-4 hidden md:block" />
                        <ArrowDown className="w-4 h-4 md:hidden" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 text-[11px] text-text-secondary flex justify-between items-center">
            <span>Modelado CloudOps</span>
            <span className="text-primary font-medium">AWS Well-Architected Framework</span>
          </div>
        </div>

        {/* Resumen Compacto de Seguridad y Cumplimiento (1 Columna) */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-500/10 text-security rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-base leading-tight">
                    Seguridad y Cumplimiento
                  </h3>
                  <p className="text-[11px] text-text-secondary">
                    {securityMetrics.totalChecks} verificaciones evaluadas
                  </p>
                </div>
              </div>
              <StatusBadge status={securityMetrics.overallStatus} size="sm" />
            </div>

            {/* Barra de progreso de cumplimiento */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-3">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-text-primary">Cumplimiento Global</span>
                <span className="text-xs font-bold text-emerald-600">
                  {securityMetrics.compliancePercentage}%
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${securityMetrics.compliancePercentage}%` }}
                />
              </div>
            </div>

            {/* Tarjetas Cuantitativas Apiladas */}
            <div className="space-y-2">
              <div className="p-2.5 bg-emerald-50/60 border border-emerald-200/60 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-emerald-950">Conformes</span>
                </div>
                <span className="text-xs font-extrabold text-emerald-900">
                  {securityMetrics.correctCount} / {securityMetrics.totalChecks}
                </span>
              </div>

              <div className="p-2.5 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-amber-950">En Revisión</span>
                </div>
                <span className="text-xs font-extrabold text-amber-900">
                  {securityMetrics.revisionCount}
                </span>
              </div>

              <div className="p-2.5 bg-red-50/60 border border-red-200/60 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-red-950">Atención Requerida</span>
                </div>
                <span className="text-xs font-extrabold text-red-900">
                  {securityMetrics.problemCount}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 text-[11px] text-text-secondary flex justify-between items-center">
            <span>Modelo AWS</span>
            <span className="text-emerald-600 font-semibold">Responsabilidad Compartida</span>
          </div>
        </div>
      </div>
    </div>
  );
};