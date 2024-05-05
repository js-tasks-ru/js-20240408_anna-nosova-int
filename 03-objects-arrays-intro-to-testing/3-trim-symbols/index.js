/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let result = '';
  let previousSymbol = '';
  let count = 0;

  if (size === 0) { return ''; }
  if (size === undefined) { return string; }

  for (const symbol of string) {
    if (symbol === previousSymbol) {
      count++;
      if (count <= size) {
        result += symbol;
      }
    } else {
      count = 1;
      previousSymbol = symbol;
      result += symbol;
    }
  }
  return result;
}
