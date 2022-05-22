

/**
 * className : Use class like Vue JS
 * ? string : 'class1 class2 ...'
 * ? {[key: string]: boolean} : { 'class1': true, ... }
 * ? ({[key: string]: boolean} | string)[] : ['class1 class2', 'class3', { 'class3': true, ... }, ...]
 * @param {string | {[key: string]: boolean} | ({[key: string]: boolean} | string)[]} classes
 * @return {string} 
 */
const classNames = (classes) => {
    if (Array.isArray(classes)) {
        const list = []
        classes.forEach(
            classGroup => 
                (typeof classGroup === 'object') ? list.push(classesFromObject(classGroup)) : list.push(classGroup)
        , [])
        return list.join(' ')
    } else if (typeof classes === 'object') {
        return classesFromObject(classes)
    }
    return classes
}
/**
 * Format object class to string
 * @param {{[key: string]: boolean}} 
 * @returns {string}
 */
const classesFromObject = (classes) => Object.entries(classes)
    .filter((entry) => entry[1])
    .map((entry) => entry[0])
    .join(" ")

export default classNames