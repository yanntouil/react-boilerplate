


/**
 * Camalize a string
 * @param {String}
 * @returns {String}
 */
const camalize = (string) => string.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())

/**
 * Capitalize the first character of a string
 * @param {string} string
 * @return {string}
 */
const ucFirst = ([ first, ...rest ]) => first.toLocaleUpperCase() + rest.join('')

/**
 * Pads a string value with leading zeroes until length is reached
 * ? Example: zeroPad(8, 3) => "008"
 * @param {string | number} value 
 * @param {number} [length = 2]
 * @returns {string}
 */
const zeroPad = (value, length = 2) => `${value}`.padStart(length, '0')



export { camalize, ucFirst, zeroPad }