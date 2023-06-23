import $ from "jquery";

export const fillZero = (str) => {
    if (str.length == 1) return "0" + str;
    else return str;
}

export const getDay = (day) => {
    switch (day) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return "";
    }
}

export const getFormatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.getFullYear().toString().slice(2, 4)
        + "." + fillZero((dateObj.getMonth()+1))
        + "." + fillZero(dateObj.getDate())
        + "(" + getDay(dateObj.getDay()) + ")";
}