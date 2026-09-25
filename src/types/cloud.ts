// ============================================
// Estados (uno por módulo, según lo definido)
// ============================================

/** Estado de utilización de un servicio AWS (Módulo 7 - Catálogo) */
export type ServiceStatus = "Activo" | "Inactivo" | "En prueba";

/** Estado de una región/infraestructura desplegada (Módulo 4) */
export type InfrastructureStatus = "Operativo" | "Degradado" | "Caído";

/** Estado tipo semáforo para indicadores de Seguridad (Módulo 5) */
export type SecurityStatus = "correcto" | "revision" | "problema";

// ============================================
// Nivel de disponibilidad (Módulo 2 - Planning)
// ============================================

export type AvailabilityLevel = "Básico" | "Alta disponibilidad" | "Crítica";

// ============================================
// Servicio AWS (Módulo 7, y reutilizado en Módulo 3 - Costos)
// ============================================

export interface AWSService {
  id: string;
  name: string;
  category: string;
  description: string;
  mainFunction: string;
  status: ServiceStatus;
  architectureRole: string;      // rol dentro de una arquitectura típica
  keyCapabilities: string[];     // 3 capacidades clave, bullets cortos
  docsUrl: string;               // link a documentación oficial de AWS
}

// ============================================
// Propuesta Cloud (Módulo 2 - Planning)
// ============================================

export interface CloudProposal {
  id: string;
  solutionName: string;
  appType: string;
  description: string;
  region: string;
  estimatedUsers: number;
  availabilityLevel: AvailabilityLevel;
  selectedServices: string[]; // IDs de AWSService seleccionados
  migrationGoal: string;
  createdAt: string; // ISO date string
}

// ============================================
// Región de infraestructura global (Módulo 4)
// ============================================

export interface Region {
  id: string;
  name: string;
  location: string;
  deployedServices: string[];
  status: InfrastructureStatus;
  description: string;
}

// ============================================
// Estimación de costos (Módulo 3)
// ============================================

export interface CostEstimate {
  id: string;
  proposalId?: string;
  serviceId: string; // referencia a AWSService
  quantity: number;
  estimatedHours: number;
  hourlyRate: number;
  monthlyCost: number;
  annualCost: number;
}

// ============================================
// Indicador de seguridad (Módulo 5)
// ============================================

export interface SecurityCheck {
  id: string;
  category: string; // ej. "IAM", "Protección de cuentas", "Protección de datos", "Cumplimiento"
  description: string;
  status: SecurityStatus;
}