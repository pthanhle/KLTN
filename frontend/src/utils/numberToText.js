

const baseNumVi = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
const scalesVi = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ", "tỷ tỷ"];

function readGroup3Vi(n, isFirst) {
    if (n === 0) return "";
    let str = "";
    const tram = Math.floor(n / 100);
    const chuc = Math.floor((n % 100) / 10);
    const donvi = n % 10;

    if (tram !== 0 || !isFirst) {
        str += baseNumVi[tram] + " trăm ";
        if (chuc === 0 && donvi !== 0) str += "lẻ ";
    }
    if (chuc !== 0) {
        if (chuc === 1) str += "mười ";
        else str += baseNumVi[chuc] + " mươi ";
    }
    if (donvi !== 0) {
        if (donvi === 1 && chuc !== 0 && chuc !== 1) str += "mốt ";
        else if (donvi === 4 && chuc !== 0 && chuc !== 1) str += "tư ";
        else if (donvi === 5 && chuc !== 0) str += "lăm ";
        else str += baseNumVi[donvi] + " ";
    }
    return str.trim();
}

const num2TextVi = (num) => {
    if (num === 0) return "Không đồng";
    let n = Math.abs(num);
    let chunks = [];
    while (n > 0) {
        chunks.push(n % 1000);
        n = Math.floor(n / 1000);
    }
    let res = "";
    for (let i = chunks.length - 1; i >= 0; i--) {
        if (chunks[i] !== 0) {
            const groupStr = readGroup3Vi(chunks[i], i === chunks.length - 1);
            res += groupStr + " " + scalesVi[i] + " ";
        }
    }
    res = res.trim() + " đồng";
    res = res.charAt(0).toUpperCase() + res.slice(1);
    return res;
};

const onesEn = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const tensEn = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const scalesEn = ["", "thousand", "million", "billion", "trillion"];

function readGroup3En(n) {
    if (n === 0) return "";
    let str = "";
    if (n >= 100) {
        str += onesEn[Math.floor(n / 100)] + " hundred ";
        n %= 100;
    }
    if (n >= 20) {
        str += tensEn[Math.floor(n / 10)] + " ";
        n %= 10;
    }
    if (n > 0) {
        str += onesEn[n] + " ";
    }
    return str.trim();
}

const num2TextEn = (num) => {
    if (num === 0) return "Zero dollars";
    let n = Math.abs(num);
    let chunks = [];
    while (n > 0) {
        chunks.push(n % 1000);
        n = Math.floor(n / 1000);
    }
    let res = "";
    for (let i = chunks.length - 1; i >= 0; i--) {
        if (chunks[i] !== 0) {
            const groupStr = readGroup3En(chunks[i]);
            res += groupStr + " " + scalesEn[i] + " ";
        }
    }
    res = res.trim() + " dollars";
    res = res.charAt(0).toUpperCase() + res.slice(1);
    return res;
};


export const numberToText = (num, lang = 'vi') => {
    if (num === null || num === undefined || isNaN(num)) return '';
    return lang === 'vi' ? num2TextVi(num) : num2TextEn(num);
};
