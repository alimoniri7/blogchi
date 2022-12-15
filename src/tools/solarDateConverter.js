
function solarDateConvertor(gy, gm, gd) {
    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
        jy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
    }
    if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + (days % 31);
    } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
    }
    if(jm===1) jm='فروردین'
    if(jm===2) jm='ادیبهشت'
    if(jm===3) jm='خرداد'
    if(jm===4) jm='تیر'
    if(jm===5) jm='مرداد'
    if(jm===6) jm='شهریور'
    if(jm===7) jm='مهر'
    if(jm===8) jm='آبان'
    if(jm===9) jm='آذر'
    if(jm===10) jm='دی'
    if(jm===11) jm='بهمن'
    if(jm===12) jm='اسفند'
    return [jd + '\xa0\xa0' + jm + '\xa0\xa0' + jy];
}
export default solarDateConvertor
