import React, { useState } from 'react';
import { useCloudContext } from '../context/CloudContext';
import { awsServices } from '../data/awsServices';
import { StatusBadge } from '../components/StatusBadge';
import type { AvailabilityLevel } from '../types/cloud';
import {
  FileText,
  Plus,
  Trash2,
  Globe,
  Users,
  Target,
  Layers,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const Planning: React.FC = () => {
  const { state, addProposal, deleteProposal } = useCloudContext();

  // --- Estado del Formulario ---
  const [formData, setFormData] = useState({
    solutionName: '',
    appType: 'Web App / Microservicios',
    description: '',
    region: 'us-east-1',
    estimatedUsers: 1000,
    availabilityLevel: 'Alta disponibilidad' as AvailabilityLevel,
    selectedServices: [] as string[],
    migrationGoal: '',
  });

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Manejo de Checkboxes de Servicios AWS
  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(serviceId);
      if (exists) {
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter((id) => id !== serviceId),
        };
      } else {
        return {
          ...prev,
          selectedServices: [...prev.selectedServices, serviceId],
        };
      }
    });
  };

  // Envío del Formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.solutionName.trim()) {
      setFormError('Por favor ingresa un nombre para la solución.');
      return;
    }
    if (!formData.description.trim()) {
      setFormError('Por favor ingresa una descripción para la propuesta.');
      return;
    }
    if (formData.selectedServices.length === 0) {
      setFormError('Selecciona al menos un servicio AWS para la arquitectura.');
      return;
    }

    addProposal({
      solutionName: formData.solutionName,
      appType: formData.appType,
      description: formData.description,
      region: formData.region,
      estimatedUsers: Number(formData.estimatedUsers),
      availabilityLevel: formData.availabilityLevel,
      selectedServices: formData.selectedServices,
      migrationGoal: formData.migrationGoal || 'No especificado',
    });

    // Resetear Formulario
    setFormData({
      solutionName: '',
      appType: 'Web App / Microservicios',
      description: '',
      region: 'us-east-1',
      estimatedUsers: 1000,
      availabilityLevel: 'Alta disponibilidad',
      selectedServices: [],
      migrationGoal: '',
    });

    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* 1. Formulario de Registro de Propuesta */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary text-lg">
              Registrar Propuesta de Solución Cloud
            </h3>
            <p className="text-xs text-text-secondary">
              Completa la información técnica requerida para planificar la infraestructura en AWS
            </p>
          </div>
        </div>

        {formError && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-alert rounded-xl text-xs font-medium">
            {formError}
          </div>
        )}

        {formSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-security rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Propuesta registrada exitosamente en el sistema.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre de la solución */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Nombre de la Solución *
              </label>
              <input
                type="text"
                placeholder="Ej. Plataforma E-commerce Multi-Región"
                value={formData.solutionName}
                onChange={(e) => setFormData({ ...formData, solutionName: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
              />
            </div>

            {/* Tipo de aplicación */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Tipo de Aplicación
              </label>
              <select
                value={formData.appType}
                onChange={(e) => setFormData({ ...formData, appType: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
              >
                <option value="Web App / Microservicios">Web App / Microservicios</option>
                <option value="API REST & Backend Cloud">API REST & Backend Cloud</option>
                <option value="E-commerce & Procesamiento de Pagos">E-commerce & Procesamiento de Pagos</option>
                <option value="Aplicación Móvil Serverless">Aplicación Móvil Serverless</option>
                <option value="Sistema Legacy / Monolítico">Sistema Legacy / Monolítico</option>
              </select>
            </div>

            {/* Región */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Región Principal AWS
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
              >
                <option value="us-east-1">us-east-1 (N. Virginia)</option>
                <option value="us-west-2">us-west-2 (Oregon)</option>
                <option value="sa-east-1">sa-east-1 (São Paulo)</option>
                <option value="eu-west-1">eu-west-1 (Ireland)</option>
              </select>
            </div>

            {/* Usuarios Estimados */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Usuarios Estimados
              </label>
              <input
                type="number"
                min="1"
                value={formData.estimatedUsers}
                onChange={(e) => setFormData({ ...formData, estimatedUsers: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
              />
            </div>

            {/* Nivel de Disponibilidad */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Nivel de Disponibilidad Requerido
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Básico', 'Alta disponibilidad', 'Crítica'] as AvailabilityLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, availabilityLevel: level })}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                      formData.availabilityLevel === level
                        ? 'border-primary bg-primary/10 text-primary font-bold'
                        : 'border-border bg-background text-text-secondary hover:border-slate-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selección de Servicios Cloud */}
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-2">
              Servicios Cloud Seleccionados *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {awsServices.map((service) => {
                const isSelected = formData.selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceToggle(service.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-primary bg-primary/5 text-primary font-semibold'
                        : 'border-border bg-background text-text-secondary hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs">{service.name}</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                        isSelected ? 'border-primary bg-primary text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Descripción y Objetivo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Descripción *
              </label>
              <textarea
                rows={3}
                placeholder="Describe el propósito y alcance de esta arquitectura..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Objetivo de la Migración
              </label>
              <textarea
                rows={3}
                placeholder="Ej. Reducción de latencia, alta tolerancia a fallos, optimización de costos..."
                value={formData.migrationGoal}
                onChange={(e) => setFormData({ ...formData, migrationGoal: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Registrar Propuesta Cloud
            </button>
          </div>
        </form>
      </div>

      {/* 2. Lista / Tarjetas de Propuestas Registradas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text-primary text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Propuestas Registradas ({state.proposals.length})
          </h3>
          <span className="text-xs text-text-secondary">
            Almacenadas localmente
          </span>
        </div>

        {state.proposals.length === 0 ? (
          <div className="p-8 text-center bg-card rounded-2xl border border-border">
            <p className="text-xs text-text-secondary">
              No hay propuestas registradas. Completa el formulario para agregar una solución.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {state.proposals.map((prop) => (
              <div
                key={prop.id}
                className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                        {prop.appType}
                      </span>
                      <h4 className="text-base font-bold text-text-primary mt-0.5">
                        {prop.solutionName}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge status={prop.availabilityLevel} size="sm" />
                      <button
                        onClick={() => deleteProposal(prop.id)}
                        className="p-1.5 rounded-lg text-text-secondary hover:text-alert hover:bg-rose-50 transition-colors"
                        title="Eliminar propuesta"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                    {prop.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 p-3 bg-slate-50 rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Región: <strong className="text-text-primary">{prop.region}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Users className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Usuarios: <strong className="text-text-primary">{prop.estimatedUsers.toLocaleString()}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Target className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="truncate">Objetivo: <strong className="text-text-primary">{prop.migrationGoal}</strong></span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-[11px] font-semibold text-text-secondary mb-1.5 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" /> Servicios AWS Asignados ({prop.selectedServices.length}):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {prop.selectedServices.map((svcId) => {
                        const svc = awsServices.find((s) => s.id === svcId);
                        return (
                          <span
                            key={svcId}
                            className="px-2.5 py-1 bg-primary/10 text-primary font-medium rounded-lg text-xs border border-primary/20"
                          >
                            {svc ? svc.name : svcId.toUpperCase()}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-text-secondary">
                  <span>ID Propuesta: {prop.id}</span>
                  <span>Registrado el: {new Date(prop.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};