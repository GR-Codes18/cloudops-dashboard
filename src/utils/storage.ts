// Key centralizada para la versión actual del almacenamiento
export const CLOUDOPS_STORAGE_KEY = 'cloudops_dashboard_state_v1';

/**
 * Carga un estado de localStorage de forma segura.
 * Si ocurre un error de parseo o la clave no existe, retorna el fallbackValue.
 */
export function loadState<T>(key: string, fallbackValue: T): T {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return fallbackValue;
    }
    return JSON.parse(serializedState) as T;
  } catch (error) {
    console.error(`Error al cargar la clave "${key}" desde localStorage:`, error);
    return fallbackValue;
  }
}

/**
 * Guarda un estado en localStorage de forma segura.
 * Si excede la cuota o falla la serialización, maneja el error sin romper la app.
 */
export function saveState<T>(key: string, value: T): void {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error(`Error al guardar la clave "${key}" en localStorage:`, error);
  }
}

/**
 * Remueve la clave de localStorage (útil para restablecer el estado o pruebas).
 */
export function clearState(key: string = CLOUDOPS_STORAGE_KEY): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error al eliminar la clave "${key}" de localStorage:`, error);
  }
}