import { useState, useEffect } from 'react';

export const usePayrollForm = (initialData) => {
    const [formData, setFormData] = useState({
        baseSalary: initialData?.baseSalary || 0,
        kpiType: initialData?.kpiType || 'SALARY_ONLY',
        kpiValue: initialData?.kpiValue || 0,
        isOvertimeEligible: initialData?.isOvertimeEligible ?? false
    });

    const [isDirty, setIsDirty] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData({
            baseSalary: initialData?.baseSalary || 0,
            kpiType: initialData?.kpiType || 'SALARY_ONLY',
            kpiValue: initialData?.kpiValue || 0,
            isOvertimeEligible: initialData?.isOvertimeEligible ?? false
        });
        setIsDirty(false);
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const isNumeric = name === 'baseSalary' || name === 'kpiValue';

        let sanitizedValue = value;
        if (typeof value === 'string' && isNumeric) {
            sanitizedValue = value.replace(/,/g, '.');
        }

        let newValue;
        if (type === 'checkbox') {
            newValue = checked;
        } else if (isNumeric) {
            if (sanitizedValue === '') {
                newValue = '';
            } else {
                if (!/^\d*\.?\d*$/.test(sanitizedValue)) return;
                if (sanitizedValue.length > 1 && sanitizedValue.startsWith('0') && sanitizedValue[1] !== '.') {
                    sanitizedValue = sanitizedValue.replace(/^0+/, '');
                    if (sanitizedValue === '') sanitizedValue = '0';
                }

                newValue = sanitizedValue;
            }
        } else {
            newValue = sanitizedValue;
        }

        setFormData(prev => {
            const updated = { ...prev, [name]: newValue };
            if (name === 'kpiType' && newValue !== prev.kpiType) {
                if (newValue === 'SALARY_ONLY') {
                    updated.kpiValue = 0;
                } else if (initialData && newValue === initialData.kpiType) {
                    updated.kpiValue = initialData.kpiValue;
                } else {
                    updated.kpiValue = 0;
                }
            }

            checkDirty(updated);
            return updated;
        });
    };

    const handleToggleOvertime = () => {
        setFormData(prev => {
            const updated = { ...prev, isOvertimeEligible: !prev.isOvertimeEligible };
            checkDirty(updated);
            return updated;
        });
    };

    const checkDirty = (currentData) => {
        const hasChanged =
            Number(currentData.baseSalary) !== Number(initialData.baseSalary) ||
            currentData.kpiType !== initialData.kpiType ||
            Number(currentData.kpiValue) !== Number(initialData.kpiValue) ||
            currentData.isOvertimeEligible !== initialData.isOvertimeEligible;

        setIsDirty(hasChanged);
    };

    const handleReset = () => {
        setFormData({
            baseSalary: initialData?.baseSalary || 0,
            kpiType: initialData?.kpiType || 'SALARY_ONLY',
            kpiValue: initialData?.kpiValue || 0,
            isOvertimeEligible: initialData?.isOvertimeEligible ?? false
        });
        setIsDirty(false);
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!isDirty) return;

        setIsSaving(true);
        try {
            const payload = {
                ...formData,
                baseSalary: Number(formData.baseSalary) || 0,
                kpiValue: Number(formData.kpiValue) || 0,
            };

            // Tương lai: await axios.put(`/api/staff/${initialData._id}/payroll`, payload);
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
            import('antd').then(({ message }) => {
                message.success('Đã lưu cấu hình lương thưởng (API Ready)');
            });
            setIsDirty(false);
        } catch (error) {
            import('antd').then(({ message }) => {
                message.error('Lỗi khi lưu cấu hình');
            });
        } finally {
            setIsSaving(false);
        }
    };

    return {
        formData,
        isDirty,
        isSaving,
        handleInputChange,
        handleToggleOvertime,
        handleReset,
        handleSubmit
    };
};
