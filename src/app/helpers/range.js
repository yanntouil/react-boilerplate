/**
 * Range return an array of number between from and to incremented by step
 * @param {number} from
 * @param {number} to
 * @param {number} [step=1]
 * @return {number[]} 
 */
const range = (from, to, step = 1) => {
    let i = from
    const range = []
    while (i <= to) {
        range.push(i)
        i += step
    }
    return range
}
export default range