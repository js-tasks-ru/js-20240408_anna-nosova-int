/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  let result = new Object();

  Object.entries(obj).forEach(([key, value]) => fields.includes(key || value) ? result[key] = value : null);

  return result;
};
