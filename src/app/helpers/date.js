import { zeroPad } from "."





/**
 * Checks if date is a valid Date
 * @param {unknown} date 
 * @returns {boolean}
 */
export const isDate = (date) => date instanceof Date && !isNaN(date.valueOf())

/**
 * Checks if two date values are of the same month and year
 * @param {unknown} date 
 * @param {unknown} [basedate=(new Date())]
 * @returns {boolean}
 */
export const isSameMonth = (date, basedate = new Date()) => {
    if (!(isDate(date) && isDate(basedate))) return false
    return basedate.getMonth() === date.getMonth() && basedate.getFullYear() === date.getFullYear()
}

/**
 * Checks if two date are the same day (day, month, year)
 * @param {Date} date 
 * @param {Date} [basedate=(new Date())]
 * @returns {Boolean}
 */
export const isSameDay = (date, basedate = new Date()) => 
    basedate.getDate() === date.getDate() && 
    basedate.getMonth() === date.getMonth() && 
    basedate.getFullYear() === date.getFullYear()


/**
 * Checks if date is before an other date (day, month, year)
 * @param {Date} date 
 * @param {Date} [basedate=(new Date())]
 * @returns {Boolean}
 */
export const isBeforeDay = (date, basedate = new Date()) => {
    const dateBefore = +(
        date.getFullYear().toString() +
        zeroPad(date.getMonth() + 1) +
        zeroPad(date.getDate())
    )
    const dateAfter = +(
        basedate.getFullYear().toString() +
        zeroPad(basedate.getMonth() + 1) +
        zeroPad(basedate.getDate())
    )
    return dateBefore < dateAfter
}

/**
 * Return ISO date (yyyy-mm-dd)
 * @param {Date} [date=(new Date())]
 * @returns {string}
 */
export const getDateISO = (date = new Date()) => [ 
    date.getFullYear(), 
    zeroPad(date.getMonth() + 1), 
    zeroPad(date.getDate())
].join('-')

/**
 * Checks if ISO date is valid
 * @param {string} dateISO 
 * @returns {boolean}
 */
export const dateISOIsValid = (dateISO) => 
    dateISO.match(/^(\d{4})-(\d{2})-(\d{2})$/) && !isNaN(Date.parse(dateISO)) ? true : false

/**
 * First day of the month for a given year from 1 - 7
 * @param {{month: number, year: number}} date 
 * @returns {number} 1 => Sunday, 7 => Saturday
 */
export const getMonthFirstDay = (date) => 
    (new Date(`${date.year}-${zeroPad(date.month)}-01`).getDay()) + 1

/**
 * Number days in a month for a given year from 28 - 31
 * @param {{month: number, year: number}} date 
 * @returns {number}
 */
export const getMonthDays = (date) => 
    date.month === 2 ? 
        (date.year % 4 === 0 ? 29 : 28) : // Feb
        ([4, 6, 9, 11].includes(date.month) ? 30 : 31)// Others months

/**
 * Return previous month
 * @param {{month: number, year: number}} date 
 * @returns {{month: number, year: number}}
 */
export const getPreviousMonth = (date) => ({
    month: date.month > 1 ? date.month - 1 : 12,
    year: date.month > 1 ? date.year : date.year - 1,
})

/**
 * Return next month
 * @param {{month: number, year: number}} date 
 * @returns {{month: number, year: number}}
 */
export const getNextMonth = (date) => ({
    month: date.month < 12 ? date.month + 1 : 1,
    year: date.month < 12 ? date.year : date.year + 1,
})







/**
 * Calandar day class
 * @class CalendarDay
 * @property {number} year
 * @property {number} month
 * @property {number} day
 */
export class CalendarDay {
    /**
     * Creates an instance of calendarDay.
     * @param {Number} year
     * @param {Number} month
     * @param {Number} day
     * @constructor
     * @memberof CalendarDay
     */
    constructor(date) {
        this.year = date.year
        this.month = date.month
        this.day = date.day
    }
    /**
     * getIso
     * @returns {string}
     */
    getIso() {
        return [this.year, zeroPad(this.month), zeroPad(this.day)].join('-')
    }
}


/**
 * Build a monthly calendar
 * @param {{year: number, month: number}} date
 * @return {CalendarDay[]} 
 */
export const calendarViewMonth = (date) => {
    const monthDays = getMonthDays(date)// Number days in a month
    const monthFirstDay = getMonthFirstDay(date)// First day of the month
    const daysFromPreviousMonth = monthFirstDay - 1;// Number of day from previous month
    const daysFromNextMonth = (CALENDAR_WEEKS * 7) - (daysFromPreviousMonth + monthDays)// Number of day from next month
    // Get the previous and next months and years
    const previousDate = getPreviousMonth(date)
    const nextDate = getNextMonth(date)
    // Get number of days in previous month
    const previousMonthDays = getMonthDays(previousDate)
    // Builds calendar dates
    const previousMonthDates = [...new Array(daysFromPreviousMonth)].map(// Previous month
            (n, index) => new CalendarDay({
                ...previousDate, 
                day: index + 1 + previousMonthDays - daysFromPreviousMonth
            })
        )
    const thisMonthDates = [...new Array(monthDays)].map(// Current month
        (n, index) => new CalendarDay({
            ...date,
            day: index + 1
        })
    )
    const nextMonthDates = [...new Array(daysFromNextMonth)].map(// Next month
        (n, index) => new CalendarDay({
            ...nextDate, 
            day: index + 1
        })
    )
    return [ ...previousMonthDates, ...thisMonthDates, ...nextMonthDates ]// Combines all dates
}


/**
 * Build an annual calendar
 * @param {number} year
 * @param {number} range
 * @return {number[]} 
 */
export const calendarViewYears = (year, range = 12) => {
    const years = []
    for (let i = year - range; i <= year + range; i++) {
        years.push(i)
    }
    return years
}

/**
 * Number of week to show in calendar month
 * @const {number} CALENDAR_WEEKS
 */
export const CALENDAR_WEEKS = 6

/**
 * Week days abbreviation
 * @const {Object} WEEK_DAYS
 */
export const WEEK_DAYS = {
    Monday: "Mo",
    Tuesday: "Tu",
    Wednesday: "We",
    Thursday: "Th",
    Friday: "Fr",
    Saturday: "Sa",
    Sunday: "Su",
}

/**
 * Month abbreviation
 * @const {Object} CALENDAR_MONTHS
 */
export const CALENDAR_MONTHS = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec"
}