export const formatVND = (price) => {
    if (price >= 1000000000) {
        return (price / 1000000000).toFixed(3).replace(/\.000$/, '') + ' Tỷ';
    }
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
};
