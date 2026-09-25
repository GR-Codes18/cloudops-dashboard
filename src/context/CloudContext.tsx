import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { type CloudProposal, type CostEstimate } from '../types/cloud';
import { loadState, saveState, CLOUDOPS_STORAGE_KEY } from '../utils/storage';

// --- Estado Inicial Mock ---
const initialProposals: CloudProposal[] = [
  {
    id: 'prop-1',
    solutionName: 'Sistema ERP Empresarial Cloud',
    appType: 'Web App / Microservicios',
    description: 'Migración del sistema ERP legacy hacia una arquitectura moderna, escalable y distribuida en AWS.',
    region: 'us-east-1',
    estimatedUsers: 15000,
    availabilityLevel: 'Alta disponibilidad',
    selectedServices: ['ec2', 'rds', 's3', 'vpc', 'cloudfront'],
    migrationGoal: 'Mejorar el tiempo de respuesta, disponibilidad del 99.9% y automatizar respaldos.',
    createdAt: new Date().toISOString(),
  },
];

const initialCostEstimates: CostEstimate[] = [
  {
    id: 'cost-1',
    serviceId: 'ec2',
    quantity: 4,
    estimatedHours: 730,
    hourlyRate: 0.0416,
    monthlyCost: 121.47,
    annualCost: 1457.64,
  },
  {
    id: 'cost-2',
    serviceId: 'rds',
    quantity: 1,
    estimatedHours: 730,
    hourlyRate: 0.35,
    monthlyCost: 255.50,
    annualCost: 3066.00,
  },
  {
    id: 'cost-3',
    serviceId: 's3',
    quantity: 500,
    estimatedHours: 1,
    hourlyRate: 0.023,
    monthlyCost: 11.50,
    annualCost: 138.00,
  },
];

export interface CloudState {
  proposals: CloudProposal[];
  costEstimates: CostEstimate[];
}

const defaultState: CloudState = {
  proposals: initialProposals,
  costEstimates: initialCostEstimates,
};

// --- Tipos de Acciones del Reducer ---
type CloudAction =
  | { type: 'ADD_PROPOSAL'; payload: CloudProposal }
  | { type: 'DELETE_PROPOSAL'; payload: string }
  | { type: 'ADD_COST_ESTIMATE'; payload: CostEstimate }
  | { type: 'DELETE_COST_ESTIMATE'; payload: string }
  | { type: 'RESET_TO_DEFAULTS' };

// --- Reducer Puro ---
function cloudReducer(state: CloudState, action: CloudAction): CloudState {
  switch (action.type) {
    case 'ADD_PROPOSAL':
      return {
        ...state,
        proposals: [action.payload, ...state.proposals],
      };
    case 'DELETE_PROPOSAL':
      return {
        ...state,
        proposals: state.proposals.filter((p) => p.id !== action.payload),
      };
    case 'ADD_COST_ESTIMATE':
      return {
        ...state,
        costEstimates: [...state.costEstimates, action.payload],
      };
    case 'DELETE_COST_ESTIMATE':
      return {
        ...state,
        costEstimates: state.costEstimates.filter((c) => c.id !== action.payload),
      };
    case 'RESET_TO_DEFAULTS':
      return defaultState;
    default:
      return state;
  }
}

// --- Definición del Contexto ---
interface CloudContextType {
  state: CloudState;
  addProposal: (proposalData: Omit<CloudProposal, 'id' | 'createdAt'>) => void;
  deleteProposal: (id: string) => void;
  addCostEstimate: (estimateData: Omit<CostEstimate, 'id' | 'monthlyCost' | 'annualCost'>) => void;
  deleteCostEstimate: (id: string) => void;
  resetToDefaults: () => void;
}

const CloudContext = createContext<CloudContextType | undefined>(undefined);

// --- Provider ---
export const CloudProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cloudReducer, null, () => {
    return loadState<CloudState>(CLOUDOPS_STORAGE_KEY, defaultState);
  });

  useEffect(() => {
    saveState(CLOUDOPS_STORAGE_KEY, state);
  }, [state]);

  const addProposal = (proposalData: Omit<CloudProposal, 'id' | 'createdAt'>) => {
    const newProposal: CloudProposal = {
      ...proposalData,
      id: `prop-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_PROPOSAL', payload: newProposal });
  };

  const deleteProposal = (id: string) => {
    dispatch({ type: 'DELETE_PROPOSAL', payload: id });
  };

  const addCostEstimate = (estimateData: Omit<CostEstimate, 'id' | 'monthlyCost' | 'annualCost'>) => {
    const monthlyCost = Number((estimateData.quantity * estimateData.estimatedHours * estimateData.hourlyRate).toFixed(2));
    const annualCost = Number((monthlyCost * 12).toFixed(2));

    const newEstimate: CostEstimate = {
      ...estimateData,
      id: `cost-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      monthlyCost,
      annualCost,
    };
    dispatch({ type: 'ADD_COST_ESTIMATE', payload: newEstimate });
  };

  const deleteCostEstimate = (id: string) => {
    dispatch({ type: 'DELETE_COST_ESTIMATE', payload: id });
  };

  const resetToDefaults = () => {
    dispatch({ type: 'RESET_TO_DEFAULTS' });
  };

  return (
    <CloudContext.Provider
      value={{
        state,
        addProposal,
        deleteProposal,
        addCostEstimate,
        deleteCostEstimate,
        resetToDefaults,
      }}
    >
      {children}
    </CloudContext.Provider>
  );
};

export const useCloudContext = (): CloudContextType => {
  const context = useContext(CloudContext);
  if (!context) {
    throw new Error('useCloudContext debe ser utilizado dentro de un CloudProvider');
  }
  return context;
};