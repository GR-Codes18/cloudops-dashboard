import type { SecurityCheck } from '../types/cloud';

// ============================================
// Catálogo de Verificaciones de Seguridad (Módulo 5)
// ============================================
// Datos simulados, sin relación con datos reales de AWS.
// 2 checks por categoría, con estados variados para representar
// un panel de cumplimiento realista.

export const securityChecks: SecurityCheck[] = [
  // IAM
  {
    id: 'SEC-001',
    category: 'IAM',
    description: 'Autenticación multifactor (MFA) habilitada para todos los usuarios administradores.',
    status: 'correcto',
  },
  {
    id: 'SEC-002',
    category: 'IAM',
    description: 'Existen 2 roles con permisos de administrador completo sin restricción por servicio.',
    status: 'revision',
  },

  // Protección de cuentas
  {
    id: 'SEC-003',
    category: 'Protección de cuentas',
    description: 'Política de contraseñas robusta aplicada a nivel de organización.',
    status: 'correcto',
  },
  {
    id: 'SEC-004',
    category: 'Protección de cuentas',
    description: 'La cuenta raíz (root) no tiene MFA configurado.',
    status: 'problema',
  },

  // Protección de datos
  {
    id: 'SEC-005',
    category: 'Protección de datos',
    description: 'Cifrado en reposo activo mediante AWS KMS en buckets S3 y bases de datos RDS.',
    status: 'correcto',
  },
  {
    id: 'SEC-006',
    category: 'Protección de datos',
    description: 'Un bucket S3 de staging permite acceso público de lectura, pendiente de revisión.',
    status: 'revision',
  },

  // Cumplimiento
  {
    id: 'SEC-007',
    category: 'Cumplimiento',
    description: 'Registro de auditoría (CloudTrail) activo en todas las regiones utilizadas.',
    status: 'correcto',
  },
  {
    id: 'SEC-008',
    category: 'Cumplimiento',
    description: 'Certificación SOC 2 vigente, pendiente de renovación de reporte HIPAA.',
    status: 'revision',
  },
];