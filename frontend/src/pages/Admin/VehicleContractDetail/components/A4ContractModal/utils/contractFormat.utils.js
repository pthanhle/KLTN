const defaultNumbers = ' hai ba bốn năm sáu bảy tám chín';
const units = ('1 một' + defaultNumbers).split(' ');
const ch = 'lẻ mười' + defaultNumbers;
const tramo = 'không một' + defaultNumbers;
const tram = tramo.split(' ');
const u = ['', 'nghìn', 'triệu', 'tỉ'];
const chot = ' lẻ mười'.split(' ');

const readDozens = (number, full) => {
    let a = Math.floor(number / 10);
    let b = number % 10;
    let readString = '';
    if (a > 1) {
        readString = ' ' + tram[a] + ' mươi';
        if (b === 1) {
            readString += ' mốt';
        }
    } else if (a === 1) {
        readString = ' mười';
        if (b === 1) {
            readString += ' một';
        }
    } else if (full && b > 0) {
        readString = ' lẻ';
    }
    if (b === 5 && a >= 1) {
        readString += ' lăm';
    } else if (b > 1 || (b === 1 && a === 0)) {
        readString += ' ' + tram[b];
    }
    return readString;
};

const readBlock = (number, full) => {
    let a = Math.floor(number / 100);
    let b = number % 100;
    let readString = '';
    if (full || a > 0) {
        readString = ' ' + tram[a] + ' trăm';
        readString += readDozens(b, true);
    } else {
        readString = readDozens(b, false);
    }
    return readString;
};

export const numberToVietnameseWords = (number) => {
    if (number === 0) return 'không đồng';
    let strNumber = number.toString();
    if (strNumber.length === 0) return '';
    let arr = [];
    let index = strNumber.length;
    if (index === 0 || strNumber === 'NaN') return '';
    while (index >= 0) {
        arr.push(strNumber.substring(index, Math.max(index - 3, 0)));
        index -= 3;
    }
    let readString = '';
    let loop = 0;
    for (let i = 0; i < arr.length; i++) {
        let n = parseInt(arr[i]);
        if (n > 0) {
            let rs = readBlock(n, arr.length > 1 && i < arr.length - 1);
            readString = rs + (u[loop] ? ' ' + u[loop] : '') + readString;
        }
        loop++;
    }
    if (readString.trim().length > 0) {
        readString = readString.trim() + ' đồng';
        return readString.charAt(0).toUpperCase() + readString.slice(1);
    }
    return '';
};

export const formatA4Date = (dateString) => {
    if (!dateString) return 'ngày ... tháng ... năm ......';
    const d = new Date(dateString);
    return `ngày ${String(d.getDate()).padStart(2, '0')} tháng ${String(d.getMonth() + 1).padStart(2, '0')} năm ${d.getFullYear()}`;
};
