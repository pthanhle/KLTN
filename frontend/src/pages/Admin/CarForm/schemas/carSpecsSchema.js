export const getSpecsRules = () => ({
    year: [
        { required: true, message: 'Vui lòng nhập năm sản xuất' },
    ],
    odo: [
        { required: true, message: 'Vui lòng nhập ODO' }
    ],
    engine: [
        { required: true, message: 'Vui lòng nhập loại động cơ' }
    ],
    power: [
        { required: true, message: 'Vui lòng nhập công suất' }
    ],
    fuel: [
        { required: true, message: 'Vui lòng chọn loại nhiên liệu' }
    ],
    seats: [
        { required: true, message: 'Vui lòng nhập số chỗ ngồi' }
    ]
});
