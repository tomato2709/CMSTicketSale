export const DatePickerConfig = {
    // months list by order
    months: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ],

    // week days by order
    weekDays: [
        {
            name: "Chủ nhật", // used for accessibility
            short: "CN", // displayed at the top of days' rows
            isWeekend: true, // is it a formal weekend or not?
        },
        {
            name: "Thứ 2",
            short: "T2",
        },
        {
            name: "Thứ 3",
            short: "T3",
        },
        {
            name: "Thứ 4",
            short: "T4",
        },
        {
            name: "Thứ 5",
            short: "T5",
        },
        {
            name: "Thứ 6",
            short: "T6",
        },
        {
            name: "Thứ 7",
            short: "T7",
            isWeekend: true,
        },
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 0,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject: any) {
        return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date: any) {
        return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date: any) {
        return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit: any) {
        return digit;
    },

    // texts in the date picker
    nextMonth: "Tháng sau",
    previousMonth: "Tháng trước",
    openMonthSelector: "Open Month Selector",
    openYearSelector: "Open Year Selector",
    closeMonthSelector: "Close Month Selector",
    closeYearSelector: "Close Year Selector",
    defaultPlaceholder: "Select...",

    // for input range value
    from: "from",
    to: "to",

    // used for input value when multi dates are selected
    digitSeparator: ",",

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false,
};
