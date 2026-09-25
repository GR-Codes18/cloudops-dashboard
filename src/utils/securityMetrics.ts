import type { SecurityCheck } from '../types/cloud';

export interface SecuritySummary {
  totalChecks: number;
  correctCount: number;
  revisionCount: number;
  problemCount: number;
  overallStatus: 'correcto' | 'revision' | 'problema';
  compliancePercentage: number;
}

/**
 * Calcula métricas cuantitativas y el estado de salud general
 * a partir de la lista de verificaciones de seguridad.
 */
export const calculateSecurityMetrics = (checks: SecurityCheck[]): SecuritySummary => {
  const totalChecks = checks.length;
  
  if (totalChecks === 0) {
    return {
      totalChecks: 0,
      correctCount: 0,
      revisionCount: 0,
      problemCount: 0,
      overallStatus: 'correcto',
      compliancePercentage: 100,
    };
  }

  const correctCount = checks.filter((check) => check.status === 'correcto').length;
  const revisionCount = checks.filter((check) => check.status === 'revision').length;
  const problemCount = checks.filter((check) => check.status === 'problema').length;

  // Prioridad de estado global: problema > revisión > correcto
  let overallStatus: 'correcto' | 'revision' | 'problema' = 'correcto';
  if (problemCount > 0) {
    overallStatus = 'problema';
  } else if (revisionCount > 0) {
    overallStatus = 'revision';
  }

  // Porcentaje de cumplimiento basado únicamente en checks totalmente 'correcto'
  const compliancePercentage = Math.round((correctCount / totalChecks) * 100);

  return {
    totalChecks,
    correctCount,
    revisionCount,
    problemCount,
    overallStatus,
    compliancePercentage,
  };
};