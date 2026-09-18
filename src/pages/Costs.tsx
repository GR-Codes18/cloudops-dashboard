import React, { useState } from 'react';
import { useCloudContext } from '../context/CloudContext';
import { awsServices } from '../data/awsServices';
import { CostCard } from '../components/CostCard';
import { StatCard } from '../components/StatCard';
import {
  DollarSign,
  Calculator,
  Plus,
  TrendingUp,
  PieChart as PieIcon,
  Layers,
  HelpCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

export const Costs: React.FC = () => {
  const { state, addCostEstimate, deleteCostEstimate } = useCloudContext();

  // --- Estado del Formulario Calculadora ---
  const [formData, setFormData] = useState({
    serviceId: 'ec2',
    quantity: 1,
    estimatedHours: 730,
    estimatedCost: 0.05,
  });

  const [formError, setFormError] = useState('');

  // Cálculos en vivo para la vista previa
  const previewMonthly = Number(
    (formData.quantity * formData.estimatedHours * formData.estimatedCost).toFixed(2)
  );
  const previewAnnual = Number((previewMonthly * 12).toFixed(2));

  // Totales Globales
  const totalMonthly = state.costEstimates.reduce((acc, c) => acc + c.monthlyCost, 0);
  const totalAnnual = totalMonthly * 12;
  const avgCostPerService =
    state.costEstimates.length > 0
      ? totalMonthly / state.costEstimates.length
      : 0;

  // Formateo de datos para Recharts (PieChart)
  const chartData = state.costEstimates.map((item) => {
    const service = awsServices.find((s) => s.id === item.serviceId);
    return {
      name: service ? service.name : item.serviceId.toUpperCase(),
      value: item.monthlyCost,
    };
  });

  const PIE_COLORS = [
    '#2563EB',
    '#F59E0B',
    '#16A34A',
    '#0EA5E9',
    '#8B5CF6',
    '#EC4899',
    '#6366F1',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (formData.quantity <= 0) {
      setFormError('La cantidad debe ser mayor a 0.');
      return;
    }
    if (formData.estimatedHours <= 0) {
      setFormError('Las horas estimadas deben ser mayores a 0.');
      return;
    }
    if (formData.estimatedCost <= 0) {
      setFormError('La tarifa por hora debe ser mayor a 0.');
      return;
    }

    addCostEstimate({
      serviceId: formData.serviceId,
      quantity: Number(formData.quantity),
      estimatedHours: Number(formData.estimatedHours),
      estimatedCost: Number(formData.estimatedCost),
    });

    // Resetear manteniendo un estado inicial limpio
    setFormData({
      serviceId: 'ec2',
      quantity: 1,
      estimatedHours: 730,
      estimatedCost: 0.05,
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Métricas Globales de Economía Cloud */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Inversión Mensual Total"
          value={`$${totalMonthly.toFixed(2)}`}
          icon={DollarSign}
          accentColor="cost"
          subtitle="Proyección recurrente"
        />
        <StatCard
          title="Inversión Anual Total"
          value={`$${totalAnnual.toFixed(2)}`}
          icon={TrendingUp}
          accentColor="primary"
          subtitle="Proyección a 12 meses"
        />
        <StatCard
          title="Promedio por Servicio"
          value={`$${avgCostPerService.toFixed(2)}`}
          icon={Calculator}
          accentColor="security"
          subtitle="Costo medio mensual"
        />
        <StatCard
          title="Ítems Presupuestados"
          value={state.costEstimates.length}
          icon={Layers}
          accentColor="primary"
          subtitle="Componentes analizados"
        />
      </div>

      {/* 2. Calculadora de Costos y Gráfico de Distribución */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario Calculadora (2 Columnas) */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="p-2.5 bg-amber-500/10 text-cost rounded-xl">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-lg">
                Calculadora de Estimación de Costos
              </h3>
              <p className="text-xs text-text-secondary">
                Simula el impacto financiero agregando recursos específicos a la arquitectura
              </p>
            </div>
          </div>

          {formError && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-alert rounded-xl text-xs font-medium">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Selección del Servicio */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Servicio AWS *
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
                >
                  {awsServices.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.name} ({svc.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Cantidad de Instancias / Recursos */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Cantidad de Instancias / Recursos *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              {/* Horas al Mes */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Horas Estimadas de Uso al Mes *
                </label>
                <input
                  type="number"
                  min="1"
                  max="730"
                  value={formData.estimatedHours}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedHours: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
                />
                <span className="text-[10px] text-text-secondary mt-0.5 block">
                  730 horas = 24/7 durante un mes completo
                </span>
              </div>

              {/* Tarifa por Hora */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Tarifa / Costo por Hora ($ USD) *
                </label>
                <input
                  type="number"
                  step="0.001"
                  min="0.001"
                  value={formData.estimatedCost}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedCost: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Panel de Vista Previa Instantánea */}
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span>Vista previa del cálculo:</span>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-text-secondary block">
                    Costo Mensual
                  </span>
                  <span className="text-sm font-bold text-cost">${previewMonthly.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-text-secondary block">
                    Costo Anual
                  </span>
                  <span className="text-sm font-bold text-text-primary">${previewAnnual.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-cost text-white text-xs font-bold rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Agregar Estimación
              </button>
            </div>
          </form>
        </div>

        {/* Gráfico de Torta de Distribución (1 Columna) */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-text-primary text-base flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-cost" />
                Proporción de Costos
              </h3>
            </div>
            <p className="text-xs text-text-secondary mb-4">
              Distribución porcentual por recurso en el presupuesto mensual
            </p>

            <div className="h-56 w-full flex items-center justify-center">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {chartData.map((_, index) => (
                        <Cell
                          key={`pie-cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`$${Number(value ?? 0).toFixed(2)}`, 'Costo Mensual']}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        borderColor: '#E2E8F0',
                        fontSize: '12px',
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-xs text-text-secondary text-center">
                  Sin ítems registrados para generar la gráfica.
                </p>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-text-secondary flex justify-between">
            <span>Modelo Económico AWS</span>
            <span className="text-cost font-semibold">Pay-As-You-Go</span>
          </div>
        </div>
      </div>

      {/* 3. Desglose de Estimaciones Registradas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text-primary text-base flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-cost" />
            Desglose de Estimaciones Activas ({state.costEstimates.length})
          </h3>
        </div>

        {state.costEstimates.length === 0 ? (
          <div className="p-8 text-center bg-card rounded-2xl border border-border">
            <p className="text-xs text-text-secondary">
              No hay ítems de costo registrados. Utiliza la calculadora para agregar componentes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.costEstimates.map((estimate) => (
              <CostCard
                key={estimate.id}
                estimate={estimate}
                onDelete={deleteCostEstimate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};