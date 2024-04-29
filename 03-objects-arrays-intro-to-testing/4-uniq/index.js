/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  return Array.from(new Set(arr));
}

// без Set, для себя
// if (arr) {
//   let result = [...arr];
//   for ( let i = 0; i < result.length; i++ ) {
//     for ( let j = i + 1; j < result.length; j++ ) {
//       if ( result[i] === result[j] ) {
//         result.splice(j, 1);
//       }
//     }
//   }
//   return result;
// } else {
//   return [];
// }
