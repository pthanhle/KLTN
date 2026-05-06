export const calculateTenure = (joinDateStr) => {
    if (!joinDateStr) return 'N/A';
    const joinDate = new Date(joinDateStr);
    const now = new Date();
    
    let years = now.getFullYear() - joinDate.getFullYear();
    let months = now.getMonth() - joinDate.getMonth();
    
    if (months < 0) {
        years--;
        months += 12;
    }

    if (years === 0) {
        return `${months} Tháng`;
    }
    
    return months > 0 ? `${years} Năm ${months} Tháng` : `${years} Năm`;
};

export const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
};
