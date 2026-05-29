// Validar que un campo de texto no esté vacío y tenga una longitud mínima
export const validateStringLength = (value, minLength = 3) => {
  if (!value || typeof value !== 'string') {
    return { valid: false, error: 'El campo es requerido y debe ser texto' };
  }
  if (value.trim().length < minLength) {
    return { 
      valid: false, 
      error: `El campo debe tener al menos ${minLength} caracteres` 
    };
  }
  return { valid: true };
};

// Validar que un número sea válido
export const validateNumber = (value, fieldName = 'valor') => {
  if (value === null || value === undefined || typeof value !== 'number') {
    return { valid: false, error: `${fieldName} debe ser un número válido` };
  }
  return { valid: true };
};

// Validar coordenadas (latitude y longitude)
export const validateCoordinates = (latitude, longitude) => {
  const latValidation = validateNumber(latitude, 'Latitud');
  if (!latValidation.valid) return latValidation;
  
  if (latitude < -90 || latitude > 90) {
    return { valid: false, error: 'Latitud debe estar entre -90 y 90' };
  }

  const longValidation = validateNumber(longitude, 'Longitud');
  if (!longValidation.valid) return longValidation;
  
  if (longitude < -180 || longitude > 180) {
    return { valid: false, error: 'Longitud debe estar entre -180 y 180' };
  }

  return { valid: true };
};

// Validar que el displayOrder sea un número válido y mayor a 0
export const validateDisplayOrder = (value) => {
  const validation = validateNumber(value, 'Display order');
  if (!validation.valid) return validation;
  
  if (value <= 0) {
    return { valid: false, error: 'Display order debe ser mayor a 0' };
  }
  
  return { valid: true };
};
